import ApplicationForm from "@/components/shared/ApplicationForm"
import { currentUser } from "@clerk/nextjs";

const CreateApplication = async () => {
  // const { sessionClaims } = auth();

  const user = await currentUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Application</h3>
      </section>

      <div className="wrapper my-8">
        <ApplicationForm userId={userId} type="Create" />
      </div>
    </>
  )
}

export default CreateApplication