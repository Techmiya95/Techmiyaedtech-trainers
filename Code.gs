/**
 * Techmiya EdTech - Trainer Hiring Portal Google Apps Script (Code.gs)
 * 
 * Instructions to Deploy & Authorize:
 * 1. Open your Google Sheet (e.g. "Techmiya Trainer Applications").
 * 2. Click Extensions -> Apps Script.
 * 3. Replace all code in Code.gs with this complete script and click Save (Ctrl + S).
 * 4. IMPORTANT STEP FOR GOOGLE DRIVE PERMISSIONS:
 *    - In the top toolbar dropdown next to "Debug", select the function "setupDrivePermissions".
 *    - Click "Run" (▶️).
 *    - Google will prompt for permissions. Click "Review permissions" -> select your Google Account -> "Advanced" -> "Go to TechmiyaTrainerReceiver (unsafe)" -> "Allow".
 * 5. DEPLOY AS WEB APP:
 *    - Click blue "Deploy" button (top right) -> "New deployment" (or "Manage deployments" -> edit gear -> "New version").
 *    - Select type: "Web app".
 *    - Description: "Techmiya Trainer API v2 (Google Drive + Sheet)"
 *    - Execute as: "Me (your email address)"
 *    - Who has access: "Anyone" (CRITICAL: Must be "Anyone" so frontend submissions don't require Google login).
 * 6. Click "Deploy" (or "Update"), copy the Web App URL (ends in /exec), and update VITE_GOOGLE_APPS_SCRIPT_URL in your .env file.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for lock to prevent concurrent write collisions
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc ? doc.getActiveSheet() : SpreadsheetApp.getSheets()[0];

    // 1. Auto-create headers if the sheet is newly created/empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Full Name",
        "Phone Number",
        "Email ID",
        "Experience (Years)",
        "Topics / Domains Interested",
        "Permanent Location",
        "Current Location",
        "Preferred Location",
        "Resume Cloud URL",
        "Profile Image Cloud URL"
      ];
      sheet.appendRow(headers);
      
      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // 2. Parse incoming JSON request body from React application safely
    var contents = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    var data = {};
    try {
      data = JSON.parse(contents);
    } catch (parseErr) {
      data = (e && e.parameter) ? e.parameter : {};
    }

    // 3. Get or Create "Techmiya Trainer Uploads" Folder in Google Drive
    var folderName = "Techmiya Trainer Uploads";
    var targetFolder;
    try {
      var folders = DriveApp.getFoldersByName(folderName);
      if (folders.hasNext()) {
        targetFolder = folders.next();
      } else {
        targetFolder = DriveApp.createFolder(folderName);
      }
    } catch (driveAuthErr) {
      Logger.log("Drive Access Warning: " + driveAuthErr.toString());
      targetFolder = DriveApp.getRootFolder();
    }

    var resumeDriveUrl = "";
    var imageDriveUrl = "";

    // 4. Save Resume File to Google Drive
    if (data.resumeBase64 && data.resumeFileName) {
      try {
        var cleanResumeBase64 = data.resumeBase64.replace(/^data:.*?;base64,/, '').trim();
        var resumeBytes = Utilities.base64Decode(cleanResumeBase64);
        var resumeBlob = Utilities.newBlob(
          resumeBytes,
          data.resumeMimeType || "application/pdf",
          (data.fullName || "Trainer") + "_Resume_" + data.resumeFileName
        );
        var resumeFile = targetFolder.createFile(resumeBlob);
        try {
          resumeFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        } catch (shareErr) {
          Logger.log("Resume sharing notice: " + shareErr.toString());
        }
        resumeDriveUrl = resumeFile.getUrl();
      } catch (err) {
        Logger.log("Resume Upload Error: " + err.toString());
        resumeDriveUrl = data.resumeUrl || ("Drive Upload Failed: " + err.toString());
      }
    } else {
      resumeDriveUrl = data.resumeUrl || "";
    }

    // 5. Save Profile Photo to Google Drive
    if (data.imageBase64 && data.imageFileName) {
      try {
        var cleanImageBase64 = data.imageBase64.replace(/^data:.*?;base64,/, '').trim();
        var imageBytes = Utilities.base64Decode(cleanImageBase64);
        var imageBlob = Utilities.newBlob(
          imageBytes,
          data.imageMimeType || "image/jpeg",
          (data.fullName || "Trainer") + "_Photo_" + data.imageFileName
        );
        var imageFile = targetFolder.createFile(imageBlob);
        try {
          imageFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        } catch (shareErr) {
          Logger.log("Image sharing notice: " + shareErr.toString());
        }
        imageDriveUrl = imageFile.getUrl();
      } catch (err) {
        Logger.log("Photo Upload Error: " + err.toString());
        imageDriveUrl = data.imageUrl || ("Drive Upload Failed: " + err.toString());
      }
    } else {
      imageDriveUrl = data.imageUrl || "";
    }

    // 6. Construct new row array matching column headers
    var newRow = [
      new Date(),
      data.fullName || "",
      "'" + (data.phone || ""), // Prefix with single quote to preserve 10-digit format
      data.email || "",
      data.experienceYears || 0,
      data.topicsInterested || "",
      data.permanentLocation || "",
      data.currentLocation || "",
      data.preferredLocation || "",
      resumeDriveUrl,
      imageDriveUrl
    ];

    // 7. Append row to spreadsheet
    sheet.appendRow(newRow);
    var rowNumber = sheet.getLastRow();

    // 8. Return JSON response
    return ContentService
      .createTextOutput(JSON.stringify({
        "status": "success",
        "message": "Trainer application registered successfully!",
        "rowNumber": rowNumber,
        "resumeDriveUrl": resumeDriveUrl,
        "imageDriveUrl": imageDriveUrl
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        "status": "error",
        "message": error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle GET requests for health check verification
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      "status": "active",
      "service": "Techmiya EdTech Trainer Hiring Web App Service",
      "timestamp": new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * RUN THIS FUNCTION ONCE IN APPS SCRIPT EDITOR TO AUTHORIZE GOOGLE DRIVE ACCESS PERMISSIONS!
 */
function setupDrivePermissions() {
  var folder = DriveApp.createFolder("Techmiya Drive Permission Test");
  Logger.log("Google Drive Permissions Authorized Successfully: " + folder.getUrl());
  DriveApp.removeFolder(folder);
}
