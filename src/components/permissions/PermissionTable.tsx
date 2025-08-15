"use client";

import { useState, useEffect } from "react";
import {
  PERMISSIONS,
  PERMISSION_MATRIX,
  getAdminRoles,
  AdminRole,
} from "@/lib/permissions";
import { PermissionMatrix } from "@/types/permissions";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Search, Users, Settings } from "lucide-react";

// Cookie utilities
function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function getPermissionTableFromCookie(): PermissionMatrix {
  const cookie = getCookie("permissionMatrix");
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch (error) {
      console.error("Failed to parse permission matrix from cookie:", error);
    }
  }
  return PERMISSION_MATRIX;
}

function savePermissionTableToCookie(matrix: PermissionMatrix) {
  document.cookie = `permissionMatrix=${JSON.stringify(matrix)}; path=/; max-age=86400`;
}

export function PermissionTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [permissionMatrix, setPermissionMatrix] =
    useState<PermissionMatrix>(PERMISSION_MATRIX);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const adminRoles: AdminRole[] = getAdminRoles();

  // Load permission matrix from cookie after hydration
  useEffect(() => {
    const cookieMatrix = getPermissionTableFromCookie();
    setPermissionMatrix(cookieMatrix);
  }, []);

  // Filter permissions based on search term
  const filteredPermissions = PERMISSIONS.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.key.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Group permissions by category
  const userPermissions = filteredPermissions.filter(
    (p) => p.category === "users",
  );
  const settingsPermissions = filteredPermissions.filter(
    (p) => p.category === "settings",
  );

  const handlePermissionToggle = async (
    permissionKey: string,
    role: AdminRole,
    enabled: boolean,
  ) => {
    // Optimistic update
    setPermissionMatrix((prev) => ({
      ...prev,
      [permissionKey]: {
        ...prev[permissionKey],
        [role]: enabled,
      },
    }));

    // Mark as having unsaved changes
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Save to cookie
      savePermissionTableToCookie(permissionMatrix);
      setHasUnsavedChanges(false);

      // Simulate API delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to save permissions:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    const cookieMatrix = getPermissionTableFromCookie();
    setPermissionMatrix(cookieMatrix);
    setHasUnsavedChanges(false);
  };

  const PermissionGroup = ({
    title,
    permissions,
    count,
    icon: Icon,
  }: {
    title: string;
    permissions: typeof PERMISSIONS;
    count: number;
    icon: any;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground font-medium">
          ({count})
        </span>
      </div>

      {permissions.map((permission) => (
        <div
          key={permission.key}
          className="flex items-start justify-between py-2 px-1"
        >
          {/* Permission info */}
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{permission.name}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center">
                    <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{permission.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <code className="text-xs text-muted-foreground">
              {permission.key}
            </code>
          </div>

          {/* Role checkboxes */}
          <div className="flex items-center gap-8">
            {adminRoles.map((role) => (
              <div key={role} className="w-24 flex items-center justify-center">
                <Checkbox
                  checked={permissionMatrix[permission.key]?.[role] ?? false}
                  onCheckedChange={(checked) =>
                    handlePermissionToggle(
                      permission.key,
                      role,
                      checked as boolean,
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Management</CardTitle>
        <CardDescription>
          Manage role permissions and access control for admin users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search permissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 max-w-sm"
          />
        </div>

        {/* Permission table */}
        <div className="border rounded-lg">
          {/* Table header */}
          <div className="flex items-center justify-between p-4 border-b bg-muted/50">
            <div className="flex-1">
              <span className="font-medium">Permission</span>
            </div>
            <div className="flex items-center gap-8">
              {adminRoles.map((role) => (
                <div key={role} className="w-24 text-center">
                  <span className="font-medium capitalize">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Permission groups */}
          <div className="p-4 space-y-8">
            {userPermissions.length > 0 && (
              <PermissionGroup
                title="User Management"
                permissions={userPermissions}
                count={userPermissions.length}
                icon={Users}
              />
            )}

            {settingsPermissions.length > 0 && (
              <PermissionGroup
                title="System Settings"
                permissions={settingsPermissions}
                count={settingsPermissions.length}
                icon={Settings}
              />
            )}

            {filteredPermissions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No permissions found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>

        {/* Save/Cancel buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={!hasUnsavedChanges || isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            disabled={!hasUnsavedChanges || isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

