import ApplicationsMap from "@/components/shared/ApplicationsMap";
import { Button } from "@/components/ui/button";
import { getApplicationsByUser } from "@/lib/actions/application.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

const Home = async () => {
  const user = await currentUser();
  const userId = user?.publicMetadata.userId as string;

  const allUserApplications = await getApplicationsByUser({ userId });

  return (
    <>
      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Jobs Tracked</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/applications/create">
              Create New Application
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8 flex">
        <ApplicationsMap userId={userId} data={allUserApplications?.data} />
      </section>
    </>
  )
}

export default Home