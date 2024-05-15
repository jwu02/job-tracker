import { IApplication } from "@/lib/database/models/application.model";
import ApplicationCard from "./ApplicationCard";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ApplicationsListProps = {
  userId: string,
  data: IApplication[],
  setSelectedApplication: Dispatch<SetStateAction<IApplication | undefined>>
}

const ApplicationsList = ({ 
  userId,
  data,
  setSelectedApplication 
}: ApplicationsListProps) => {
  const [collapseList, setCollapseList] = useState(false)

  return (
    <div className="absolute z-50 top-5 left-5 flex gap-3">
      {!collapseList &&
        <ScrollArea className="h-[65vh] w-80 rounded-lg border bg-white/90">
          {data.length > 0 ? (
            <ul className="flex flex-col w-full gap-2 xl:gap-5 p-5">
              {data.map((application) => {
                return (
                  <li key={application._id}>
                    <ApplicationCard userId={userId} application={application} />
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
              <h3 className="p-bold-20 md:h5-bold">No applications have been created yet</h3>
              <p className="p-regular-14">Go create some now</p>
            </div>
          )}
        </ScrollArea>
      }
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={()=>{setCollapseList((prev)=>{return !prev})}}
      >
        { collapseList ? 
          <ChevronRight className="w-5 h-5" /> : 
          <ChevronLeft className="w-5 h-5" /> 
        }
      </Button>
    </div>
  )
}

export default ApplicationsList