import { Badge } from "@/components/ui/badge";
import { getApplicationById } from "@/lib/actions/application.actions";
import { SearchParamProps } from "@/types";

const ApplicationDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const application = await getApplicationById(id);
  
  return (
    <>
    <section className="flex flex-col justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="inline-block">
        <h2 className='h2-bold'>{application.title}</h2>
        <Badge>{application.status}</Badge>
      </div>

      <div>
        <a href={application.jobPostingUrl}>{application.jobPostingUrl}</a>
      </div>
    </section>

    </>
  )
}

export default ApplicationDetails