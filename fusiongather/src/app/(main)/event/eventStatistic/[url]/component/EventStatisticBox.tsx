"use server";

import { getEventStatistic } from "@/lib/actions/event";
import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";


interface Props {
  eventId: number;
}

const formatCurrency = (amount: number | bigint) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
  console.log(formatter);
  return formatter;
};

const EventStatisticBox = async ({ eventId }: Props) => {
  const eventStatistic = await getEventStatistic(eventId);
  console.log(eventStatistic);
  const visitorRate =
    (eventStatistic?.totalVisitors / eventStatistic?.totalTickets) * 100;
  return (
    <div className="flex-1 mt-10 ml-5">
      <div className="uppercase text-xl mb-8 font-semibold">Event Statistic</div>
      <div className="grid grid-cols-1 gap-4 xl:gap-10 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        <Card
          className="border   rounded-lg p-6 flex flex-col justify-center items-center"
          elevation={3}
        >
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              Revenue
            </Typography>
            <Typography className="text-center" variant="h4" color="textPrimary" fontWeight="bold">
              {formatCurrency(eventStatistic?.eventRevenue)}
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="border   rounded-lg p-6 flex flex-col justify-center items-center"
          elevation={3}
        >
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              Total tickets
            </Typography>
            <Typography className="text-center" variant="h4" color="textPrimary" fontWeight="bold">
              {eventStatistic?.totalTickets}
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="border   rounded-lg p-6 flex flex-col justify-center items-center"
          elevation={3}
        >
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              Total booths
            </Typography>
            <Typography className="text-center" variant="h4" color="textPrimary" fontWeight="bold">
              {eventStatistic?.totalBooths}
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="border rounded-lg p-6 flex flex-col justify-center items-center"
          elevation={3}
        >
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              Total visitors
            </Typography>
            <Typography className="text-center" variant="h4" color="textPrimary" fontWeight="bold">
              {eventStatistic?.totalVisitors}
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="border rounded-lg p-6 flex flex-col justify-center items-center"
          elevation={3}
        >
          <CardContent>
            <Typography className="text-center" variant="body1" color="textSecondary">
             Ratio
            </Typography>
            <Typography className="text-center" variant="h4" color="textPrimary" fontWeight="bold">
              {visitorRate}%
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventStatisticBox;
