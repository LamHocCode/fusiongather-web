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
      <div className="grid grid-cols-1 gap-4 xl:gap-20 md:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
      <Card
      className="w-60 h-30 md:w-60 md:h-30 border border-indigo-500 rounded-lg p-6 flex flex-col justify-center items-center"
      elevation={3}
    >
      <CardContent>
        <Typography variant="body1" color="textSecondary">
          Revenue
        </Typography>
        <Typography variant="h4" color="textPrimary" fontWeight="bold">
          {formatCurrency(eventStatistic?.eventRevenue)}
        </Typography>
      </CardContent>
    </Card>
    <Card
      className="w-60 h-30 md:w-60 md:h-30 border border-indigo-500 rounded-lg p-6 flex flex-col justify-center items-center"
      elevation={3}
    >
      <CardContent>
        <Typography variant="body1" color="textSecondary">
          Total tickets
        </Typography>
        <Typography variant="h4" color="textPrimary" fontWeight="bold">
          {eventStatistic?.totalTickets}
        </Typography>
      </CardContent>
    </Card>
    <Card
      className="w-60 h-30 md:w-60 md:h-30 border border-indigo-500 rounded-lg p-6 flex flex-col justify-center items-center"
      elevation={3}
    >
      <CardContent>
        <Typography variant="body1" color="textSecondary">
          Total booths
        </Typography>
        <Typography variant="h4" color="textPrimary" fontWeight="bold">
          {eventStatistic?.totalBooths}
        </Typography>
      </CardContent>
    </Card>
    <Card
      className="w-60 h-30 md:w-60 md:h-30 border border-indigo-500 rounded-lg p-6 flex flex-col justify-center items-center"
      elevation={3}
    >
      <CardContent>
        <Typography variant="body1" color="textSecondary">
          Total visitors
        </Typography>
        <Typography variant="h4" color="textPrimary" fontWeight="bold">
          {eventStatistic?.totalVisitors}
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Typography sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} variant="h5" component="div">
            {visitorRate}%
        </Typography>
      </Box>
      <CircularProgress variant="determinate" value={visitorRate} size={150}/>
    </Card>
      </div>
    </div>
  );
};

export default EventStatisticBox;
