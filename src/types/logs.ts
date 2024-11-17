export interface UserIdentity {
  type: string;
  userName: string;
}

export interface ResponseElements {
  instancesSet?: {
    items: Array<{
      instanceId: string;
      currentState: string;
    }>;
  };
  securityGroup?: string;
  [key: string]: any;
}

export interface Log {
  timestamp: string;
  event_name: string;
  user_identity: UserIdentity;
  response_elements: ResponseElements;
  source_ip: string;
}

export interface FilterState {
  username: string;
  eventName: string;
  sourceIp: string;
}