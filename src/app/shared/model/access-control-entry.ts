export class AccessControlEntry {
  permission: string;
  guest: boolean;
  users: string[];
  roles: string[];
  groups: string[];
}
