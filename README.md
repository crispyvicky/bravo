## WhatsApp direct submissions (no app open)

These forms send data to your WhatsApp using either Twilio WhatsApp API or Meta's WhatsApp Cloud API via `/api/whatsapp`:

- `src/components/Contact.tsx`
- `pages/start-quest.tsx`

### Option A: Twilio WhatsApp (recommended)

Set the following environment variables:

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_WHATSAPP=whatsapp:+14155238886   # sandbox or your approved sender
WHATSAPP_RECIPIENT=919398012612             # your number with country code, digits only
```

Notes:
- Join the Twilio Sandbox or use your approved WhatsApp Business sender.
- Ensure your recipient is a sandbox participant or an approved contact.

### Option B: Meta WhatsApp Cloud API (fallback)

```
WHATSAPP_TOKEN=EAAG...      # Permanent token from Meta for Developers
WHATSAPP_PHONE_NUMBER_ID=12xxxxxxxxxxxx  # From WhatsApp Business Account > API Setup
WHATSAPP_RECIPIENT=919398012612         # Your recipient number with country code
```

Notes:
- Make sure the WhatsApp Business API is set up and the recipient number is reachable.
- In development, you may need to use test numbers/templates until your message type is approved.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8f8b9942-81b2-4041-8062-4dadc08ba910

## Blog Admin Console

1. Configure `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_TOKEN` in `.env`.
2. Run the app and visit `/admin/blogs`.
3. Log in with the configured credentials to create, edit, publish/unpublish, or delete blog posts.

All blog data is stored in `data/blogs.json` and exposed through the following API routes:

- `GET /api/blogs` – public feed used by the `/blog` page.
- `POST /api/blogs` – create (admin only).
- `GET /api/blogs/[slug]` – public detail page.
- `PUT /api/blogs/[slug]` & `DELETE /api/blogs/[slug]` – update/delete (admin only).
- `POST /api/admin/login|logout` and `GET /api/admin/session` – session endpoints.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8f8b9942-81b2-4041-8062-4dadc08ba910) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8f8b9942-81b2-4041-8062-4dadc08ba910) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
