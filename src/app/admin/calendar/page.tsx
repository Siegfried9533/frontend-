import Breadcrumb from "@/app/(admin)/components/common/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/app/(admin)/components/common/CalendarBox/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calender Page",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>
      <Breadcrumb pageName="Calendar" />

      <CalendarBox />
    </>
  );
};

export default CalendarPage;
