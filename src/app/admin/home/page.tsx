import { PaymentsOverview } from "@/app/admin/components/common/Charts/payments-overview";
import { UsedDevices } from "@/app/admin/components/common/Charts/used-devices";
import { WeeksProfit } from "@/app/admin/components/common/Charts/weeks-profit";
import { TopChannels } from "@/app/admin/components/common/Tables/top-channels";
import { TopChannelsSkeleton } from "@/app/admin/components/common/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/app/admin/utils/timeframe-extractor";
import { Suspense } from "react";
import { ChatsCard } from "./_components/chats-card";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { RegionLabels } from "./_components/region-labels";

type PropsType = {
  searchParams: {
    selected_time_frame?: string;
  };
};

export default function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <div className="space-y-4">
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <PaymentsOverview
          className="col-span-12 xl:col-span-7"
          key={extractTimeFrame("payments_overview")}
          timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
        />

        <WeeksProfit
          key={extractTimeFrame("weeks_profit")}
          timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
          className="col-span-12 xl:col-span-5"
        />

        <UsedDevices
          className="col-span-12 xl:col-span-5"
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
        />

        <RegionLabels />

        <div className="col-span-12 grid xl:col-span-8">
          <Suspense fallback={<TopChannelsSkeleton />}>
            <TopChannels />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <ChatsCard />
        </Suspense>
      </div>
    </div>
  );
}
