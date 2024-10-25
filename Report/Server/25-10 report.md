# User Permissions Documentation

## User Roles and Permissions
This system includes four user roles with distinct permissions and responsibilities:

| Role       | Description                                                                                   |
|------------|-----------------------------------------------------------------------------------------------|
| **Admin**  | Has full access to all features, including user management, settings, and content approval.   |
| **Manager**| Can manage users, approve content, and oversee general operations with limited admin rights.  |
| **User**   | Limited access, can view and submit content but requires approval from Admin or Manager.      |
| **Guest**  | Only has view access to publicly available content, with no editing or submission privileges. |

---

## Registration Table Structure

Below is the schema for the registration table in the system:

| Column       | Data Type | Description                                      |
|--------------|-----------|--------------------------------------------------|
| **firstname** | `string`   | User's first name                               |
| **last_name** | `string`   | User's last name                                |
| **email**     | `string`   | User's email address                            |
| **status**    | `string`   | Account status (e.g., "pending", "approved")    |
| **password**  | `string`   | User's encrypted password                       |
| **username**  | `string`   | Unique username for account login               |

---

> **Note**: Only **Admin** and **Manager** roles can approve or reject `User` registrations to enable content submission privileges.
