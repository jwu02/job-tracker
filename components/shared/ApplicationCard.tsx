import { IApplication } from "@/lib/database/models/application.model"
import { Badge } from "../ui/badge"
import moment from 'moment'
import { Button } from "../ui/button"
import { Bookmark, MapPin, SquarePen } from "lucide-react"
import Link from "next/link"
import { favouriteApplication } from "@/lib/actions/application.actions"

type ApplicationCardProps = {
  userId: string,
  application: IApplication
}

const ApplicationCard = ({ userId, application }: ApplicationCardProps) => {
  
  return (
    <div className="relative flex flex-col h-[180px] w-full max-w-[600px] p-4 rounded-xl border bg-white transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <Badge variant={application.status} className="h-6 w-fit">
          {application.status}
        </Badge>
        
        <div>
          <Button variant="ghost" size="icon">
            <Link href={`/applications/${application._id}/update`}>
              <SquarePen className="w-5 h-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon">
            <Bookmark 
              className="w-5 h-5" 
              fill={application.isFavourited ? "" : "transparent"} 
              onClick={async ()=>{
                favouriteApplication({ 
                  userId, 
                  application, 
                  path: "/home" 
                })
              }}
            />
          </Button>
        </div>
      </div>

      <div>
        {moment(application.updatedAt).calendar()}
      </div>
      
      <h2 className="h4-medium">{application.title}</h2>

      <div>
        {application.notes}
      </div>
      <div>
        <span className="inline-flex items-center">
          <MapPin className="w-5 h-5" />
          {application.latitude ? (
            application.isRemote ?  
              "Hybrid" : `${Math.round(application.latitude)}, ${Math.round(application.longitude)}` 
            ) : (application.isRemote ? 
              "Remote" : "Unknown"
            )
          }
        </span>
      </div>
    </div>
  )
}

export default ApplicationCard