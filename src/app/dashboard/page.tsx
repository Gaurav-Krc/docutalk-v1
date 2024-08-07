import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { currentUser } from '@clerk/nextjs/server';
import { absoluteUrl } from "@/lib/utils";

const Page = async () => {
 
  const user = await currentUser();

  // If no user is found, redirect to the auth-callback page
  if (!user || !user.id) {
    redirect(absoluteUrl('/auth-callback?origin=dashboard'));
  }

  // Fetch the user from the database
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  // If no user is found in the database, redirect to the auth-callback page
  if (!dbUser) {
    redirect(absoluteUrl('/auth-callback?origin=dashboard'));
  }

  const subscriptionPlan = await getUserSubscriptionPlan();
  return <Dashboard subscriptionPlan={subscriptionPlan} />;
};

export default Page;
