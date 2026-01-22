import { UsersContent } from "./users-content";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export default function AdminUsersPage() {
  return <UsersContent />;
}
