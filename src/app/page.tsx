import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Permission System Demo
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Experience granular permission-based access control in action.
          <br /> Switch between roles to see how permissions dynamically control feature access across the application.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-3">Permission Management</h2>
            <p className="text-gray-600 mb-4">
              Configure role permissions and see how they instantly affect UI access throughout the application.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-3">Role-Based Access</h2>
            <p className="text-gray-600 mb-4">
              Experience different permission levels as Guest, Customer, Auditor, Editor, or Super Admin.
            </p>
            <Link href="/admin">
              <Button className="w-full">Explore Admin Features</Button>
            </Link>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            Demo Instructions:
          </h3>
          <ol className="text-sm text-blue-800 text-left space-y-1">
            <li>
              1. <strong>Switch Roles:</strong> Use the role toggle (top-right) to experience Guest, Customer, Auditor, Editor, or Super Admin perspectives
            </li>
            <li>2. <strong>Explore Admin Features:</strong> See how different roles access Users and Settings pages</li>
            <li>3. <strong>Modify Permissions:</strong> As Super Admin, go to Settings → edit role permissions → save changes</li>
            <li>4. <strong>Test Changes:</strong> Switch roles to see how permission modifications instantly affect UI access</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
