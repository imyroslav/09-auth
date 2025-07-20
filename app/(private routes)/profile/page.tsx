import { getUser } from "../../../lib/api/serverApi";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Notehub",
  description: "Profille fetures",
  openGraph: {
    title: "Notehub",
    description: "Profille fetures",
    url: "/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub preview image",
      },
    ],
  },
}

const Profile = async () => {
  const user = await getUser()

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
         
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
         <div className={css.avatarWrapper}>
      <Image
        src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username || "your_username"}</p>
          <p>Email: {user?.email || "your_email@example.com"}</p>
        </div>
      </div>
    </main>
  );
}

export default Profile;