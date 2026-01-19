import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DashboardCards = () => {
  return (
    <div className="flex flex-row items-center justify-center p-4 gap-4 w-full">
      <Card className="w-1/3 cursor-pointer hover:bg-zinc-100">
        <CardHeader>
          <h2 className="text-lg font-semibold">Servidores Online</h2>
        </CardHeader>
        <CardContent>{0}</CardContent>
      </Card>

      <Card className="w-1/3 cursor-pointer hover:bg-zinc-100">
        <CardHeader>
          <h2 className="text-lg font-semibold">Servidores Offline</h2>
        </CardHeader>
        <CardContent>{0}</CardContent>
      </Card>

      <Card className="w-1/3 cursor-pointer hover:bg-zinc-100">
        <CardHeader>
          <h2 className="text-lg font-semibold">Servidores Cadastrados</h2>
        </CardHeader>
        <CardContent>{0}</CardContent>
      </Card>
</div>
  );
};

export default DashboardCards;
