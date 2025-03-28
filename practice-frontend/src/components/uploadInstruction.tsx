import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Upload } from "lucide-react";

export default function Instructions() {
  return (
    <div className="grid gap-6 max-w-lg mx-auto">
      <Card className="shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Upload className="w-6 h-6 text-blue-500" /> File Upload Instructions
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <img src="/instruction.png" alt="Upload Example" width={400} height={100} className="rounded-lg mb-4 shadow-md" />
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-sm">
            <li>Upload a <Badge variant="outline">high-quality</Badge> image.</li>
            <li>Ensure the image is <Badge variant="outline">clear and readable</Badge>.</li>
            <li>
              <Clock className="inline-block w-4 h-4 mr-1 text-yellow-500" /> Processing may take up to <Badge variant="outline">20 seconds</Badge>.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="w-6 h-6 text-green-500" /> Manual Entry Instructions
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-sm">
            <li>Enter the <Badge variant="outline">merchant name</Badge>.</li>
            <li>Provide the <Badge variant="outline">total amount</Badge>.</li>
            <li>Select a category from the list.</li>
            <li>
              Processing is much <Badge variant="outline">faster</Badge> than file upload.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}