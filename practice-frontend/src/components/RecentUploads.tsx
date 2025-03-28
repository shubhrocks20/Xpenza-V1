import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {  DeleteIcon, Download } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletebill, fetchRecentUploads } from "@/http";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function RecentUploads() {
  const { data: uploads = [], isLoading: loadingRecentUploads } = useQuery({
    queryKey: ["uploads"],
    queryFn: fetchRecentUploads,
  });
  const queryClient = useQueryClient();

  const deleteBillMutation = useMutation({
    mutationFn: deletebill,
    onSuccess: (data: any) => {
      toast(data.success, {
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["uploads"] });
    },
    onError: (err: any) => {
      toast("Error", {
        description: err.message,
      });
    }
  })

  

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Recent Bill Uploads</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingRecentUploads
                ? Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="w-24 h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-20 h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-16 h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-20 h-6" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="w-10 h-10 rounded-full" />
                      </TableCell>
                    </TableRow>
                  ))
                : uploads.length > 0 &&
                  uploads.map((upload: any) => (
                    <TableRow key={upload.id}>
                      <TableCell>
                        <span>{upload.category}</span>
                      </TableCell>
                      <TableCell>
                        {upload.purchaseDate
                          ? new Date(upload.purchaseDate).toISOString().split("T")[0]
                          : "N/A"}
                      </TableCell>
                      <TableCell>{upload.totalAmount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={upload.status === "Processed" ? "default" : "secondary"}
                        >
                          {upload.status || "Completed"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right justify-end flex gap-4">
                        <Button size="icon" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={() => {deleteBillMutation.mutate(upload.id)}}>
                          <DeleteIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}