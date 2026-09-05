# Google Sheets & Google Drive Setup Guide (Techmiya EdTech Portal)

Follow this step-by-step guide to connect the Techmiya EdTech Trainer Hiring Portal directly to your Google Sheet and automatically store uploaded Resumes & Photos in Google Drive.

---

## Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Rename the spreadsheet to **`Techmiya Trainer Applications`**.

---

## Step 2: Open Google Apps Script Editor
1. In your Google Sheet top bar, click **Extensions** → Select **Apps Script**.
2. Rename the script project to **`TechmiyaTrainerReceiver`**.

---

## Step 3: Paste Code.gs
1. Delete any existing code in `Code.gs`.
2. Copy and paste the entire script from [`Code.gs`](file:///d:/techmiya%20trainers%20data/Code.gs).
3. Click **Save** (💾) or press `Ctrl + S`.

---

## Step 4: Authorize Google Drive Access (CRITICAL)
1. At the top toolbar of the Apps Script Editor, locate the function dropdown (next to *Debug*).
2. Select **`setupDrivePermissions`**.
3. Click **Run** (▶️).
4. Google will prompt for permission authorization:
   - Click **Review permissions**.
   - Select your Google Account.
   - Click **Advanced** → Click **Go to TechmiyaTrainerReceiver (unsafe)**.
   - Click **Allow**.
5. Once authorized, you will see `Google Drive Permissions Authorized Successfully` in the execution log!

---

## Step 5: Deploy as a Web App (Critical Settings)
1. Click the blue **Deploy** button (top right) → Select **New deployment** (or **Manage deployments** → edit gear → **New version**).
2. Click the gear icon (⚙️) next to *Select type* → Choose **Web app**.
3. Fill in the deployment settings:
   - **Description**: `Techmiya Trainer Receiver API v2 (Sheet + Drive)`
   - **Execute as**: `Me (your email address)`
   - **Who has access**: `Anyone` *(IMPORTANT: Must select "Anyone", otherwise browser submissions will fail with network/CORS errors).*
4. Click **Deploy**.
5. Copy the generated **Web App URL** (ends in `/exec`).

---

## Step 6: Configure React Portal (.env)
1. Paste your Web App URL into your `.env` file:
   ```env
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
2. Restart your development server (`npm run dev`).

---

## How Automatic Resume & Photo Storage Works
1. **Google Drive Folder**: The script automatically creates a Google Drive folder named **`Techmiya Trainer Uploads`**.
2. **Base64 Decoding**: PDF resumes and image photos are safely converted and uploaded to Google Drive.
3. **Public Sharing Links**: The script generates viewable Google Drive links for each uploaded resume and profile picture.
4. **Google Sheet Columns**: The links are saved directly into Column J (**Resume Cloud URL**) and Column K (**Profile Image Cloud URL**).
