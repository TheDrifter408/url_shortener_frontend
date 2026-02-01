import { createFileRoute } from '@tanstack/react-router'

const Profile = () => {
  return (
    <div>
      Hello Profile
    </div>
  )
}


export const Route = createFileRoute('/_auth/profile')({
  component: Profile,
  staticData: {
    sidebar: {
      title: "Profile Settings",
      links: [
        { id: 0, title: "General", to: "/profile" },
        { id: 1, title: "Security", to: "/profile/settings" }
      ]
    }
  }
});
