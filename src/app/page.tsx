import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Protected Pages Investigation
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This is a demo of protected pages with role-based access control.
          Use the role toggle in the top-right corner to test different permission levels.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-3">Public Content</h2>
            <p className="text-gray-600 mb-4">
              This page is accessible to everyone, regardless of role.
            </p>
            <Button variant="outline" className="w-full">
              Public Action
            </Button>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-3">Admin Area</h2>
            <p className="text-gray-600 mb-4">
              Try accessing the admin area. You&apos;ll need admin permissions.
            </p>
            <Link href="/admin">
              <Button className="w-full">
                Go to Admin
              </Button>
            </Link>
          </Card>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Testing Instructions:</h3>
          <ol className="text-sm text-blue-800 text-left space-y-1">
            <li>1. Use the role toggle (top-right) to switch between Guest, User, and Admin</li>
            <li>2. Try accessing /admin with different roles</li>
            <li>3. Notice how the sidebar only appears for admin users</li>
            <li>4. Test navigation between admin pages when you have admin access</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
