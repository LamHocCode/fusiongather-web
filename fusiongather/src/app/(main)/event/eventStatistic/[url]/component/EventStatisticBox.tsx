"use server";

import { getBoothMonitor, getEventStatistic } from "@/lib/actions/event";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

interface Props {
  eventId: number;
}

const formatCurrency = (amount: number | bigint) => {
  const formatter = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  return formatter;
};

const EventStatisticBox = async ({ eventId }: Props) => {
  const eventStatistic = await getEventStatistic(eventId);
  const visitorRate = ((eventStatistic?.totalVisitors / eventStatistic?.totalTickets) * 100).toFixed(2);
  const boothMonitor = await getBoothMonitor(eventId);

  return (
    <div className="flex-1 mt-10 ml-5">
      <div className="uppercase text-xl mb-8 font-semibold">
        Event Statistic
      </div>
      <div className="grid grid-cols-1 gap-4 xl:gap-10 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        <Card
          className="border   rounded-lg p-6 flex flex-col justify-center items-center"
          elevation={3}
        >
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              Revenue
            </Typography>
            <Typography
              className="text-center"
              variant="h4"
              color="textPrimary"
              fontWeight="bold"
            >
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
            <Typography
              className="text-center"
              variant="h4"
              color="textPrimary"
              fontWeight="bold"
            >
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
            <Typography
              className="text-center"
              variant="h4"
              color="textPrimary"
              fontWeight="bold"
            >
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
            <Typography
              className="text-center"
              variant="h4"
              color="textPrimary"
              fontWeight="bold"
            >
              {eventStatistic?.totalVisitors}
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="border rounded-lg p-6 flex flex-col justify-center items-center"
          elevation={3}
        >
          <CardContent>
            <Typography
              className="text-center"
              variant="body1"
              color="textSecondary"
            >
            Attendance Ratio
            </Typography>
            <Typography
              className="text-center"
              variant="h4"
              color="textPrimary"
              fontWeight="bold"
            >
              {visitorRate}%
            </Typography>
          </CardContent>
        </Card>
      </div>

      <hr className="my-8 border-b-2 border-gray-300" />
      <div className="uppercase text-xl mb-8 font-semibold">
        Booth Monitoring
      </div>
      <div className="grid grid-cols-1 gap-4 xl:gap-10 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {/* Thêm vào đây */}
        {boothMonitor?.length > 0 ? (
          boothMonitor?.map((item: any) => (
            <Card
              key={item.id}
              className="border   rounded-lg p-6 flex flex-col justify-center items-center"
              elevation={3}
            >
              <CardContent>
                <Typography variant="body1" color="textSecondary">
                  {item.name}
                </Typography>
                <Typography
                  className="text-center"
                  variant="h4"
                  color="textPrimary"
                  fontWeight="bold"
                >
                  {item.count}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
          No booth in your event
          </Typography>
        )}
      </div>
    </div>
  );
};

export default EventStatisticBox;
