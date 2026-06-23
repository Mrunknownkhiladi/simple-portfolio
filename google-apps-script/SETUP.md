# Google Apps Script Setup

1. Open https://script.new and create a new Apps Script project.
2. Replace default code with content from `google-apps-script/Code.gs`.
3. Save project (for example: Portfolio Contact API).
4. Deploy -> New deployment -> Type: Web app.
5. Execute as: Me.
6. Who has access: Anyone.
7. Click Deploy and authorize permissions.
8. Copy the Web app URL (ends with `/exec`).
9. In `index.html`, set `CONTACT_API_URL` to that URL.
10. Redeploy your portfolio site.

## Notes
- `TO_EMAIL` is already set to `abhayrajtyagi207@gmail.com`.
- If you change email receiver, update `TO_EMAIL` in Code.gs.
- For future code changes in Apps Script, use Deploy -> Manage deployments -> Edit -> New version.
