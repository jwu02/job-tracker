import ApplicationForm from "@/components/shared/ApplicationForm"
import { getApplicationById } from "@/lib/actions/application.actions"
import { currentUser } from "@clerk/nextjs"

type UpdateApplicationProps = {
  params: {
    id: string
  }
}

const UpdateApplication = async ({ params: { id }}: UpdateApplicationProps) => {
  const user = await currentUser();
  const userId = user?.publicMetadata.userId as string;

  const application = await getApplicationById(id)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Application</h3>
      </section>

      <div className="wrapper my-8">
        <ApplicationForm
          type="Update" 
          application={application} 
          applicationId={application._id} 
          userId={userId} 
        />
      </div>
    </>
  )
}

export default UpdateApplication