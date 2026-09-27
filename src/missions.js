const missions = [
  {
    id: 1,
    title: "NETWORK UNDER ATTACK",
    description: "A user cannot reach the application server.",
    type: "interface-down",

    topology: {
      pc: "192.168.10.10",
      switch: "VLAN 10",
      router: "G0/1",
      server: "10.10.10.50",
    },

    fault: {
      device: "ROUTER",
      interface: "G0/1",
      status: "down",
    },

    router: {
      interface: "G0/1",
      ip: "10.10.20.1",
      connectedNetwork: "10.10.20.0/24",
      localRoute: "10.10.20.1/32",
      secondaryInterface: "G0/2",
      secondaryIp: "10.10.10.1",
      secondaryNetwork: "10.10.10.0/24",
      secondaryLocalRoute: "10.10.10.1/32",
    },

    solution: {
      command: "no shutdown",
    },
  },

  {
    id: 2,
    title: "VLAN MISMATCH",
    description: "A user cannot reach the application server.",
    type: "wrong-vlan",

    topology: {
      pc: "192.168.20.10",
      switch: "VLAN 10",
      router: "G0/1",
      server: "10.10.20.50",
    },

    fault: {
      device: "SWITCH",
      interface: "G0/1",
      vlan: 10,
      expectedVlan: 20,
    },

    router: {
      interface: "G0/1",
      ip: "10.10.20.1",
      connectedNetwork: "10.10.20.0/24",
      localRoute: "10.10.20.1/32",
      secondaryInterface: "G0/2",
      secondaryIp: "10.10.10.1",
      secondaryNetwork: "10.10.10.0/24",
      secondaryLocalRoute: "10.10.10.1/32",
    },

    solution: {
      command: "switchport access vlan 20",
    },
  },
    {
    id: 3,
    title: "MISSING ROUTE",
    description: "The router cannot reach the application server.",
    type: "missing-route",

    topology: {
      pc: "192.168.30.10",
      switch: "VLAN 30",
      router: "G0/1",
      server: "10.10.30.50",
    },

    fault: {
      device: "ROUTER",
      interface: "G0/1",
      destinationNetwork: "10.10.30.0/24",
      status: "missing",
    },

    router: {
      interface: "G0/1",
      ip: "10.10.30.1",
      connectedNetwork: "10.10.30.0/24",
      localRoute: "10.10.30.1/32",

      secondaryInterface: "G0/2",
      secondaryIp: "10.10.10.1",
      secondaryNetwork: "10.10.10.0/24",
      secondaryLocalRoute: "10.10.10.1/32",
    },

    solution: {
      command: "ip route 10.10.30.0 255.255.255.0 10.10.10.2",
    },
  },
    {
    id: 4,
    title: "ACL BLOCKING TRAFFIC",
    description: "The application server is reachable, but traffic is being blocked by an access control rule.",
    type: "acl-block",

    topology: {
      pc: "192.168.40.10",
      switch: "VLAN 40",
      router: "G0/1",
      server: "10.10.40.50",
    },

    fault: {
      device: "ROUTER",
      interface: "G0/1",
      acl: "BLOCK_APP",
      action: "deny",
      source: "192.168.40.0/24",
      destination: "10.10.40.50",
    },

    router: {
      interface: "G0/1",
      ip: "10.10.40.1",
      connectedNetwork: "10.10.40.0/24",
      localRoute: "10.10.40.1/32",

      secondaryInterface: "G0/2",
      secondaryIp: "10.10.10.1",
      secondaryNetwork: "10.10.10.0/24",
      secondaryLocalRoute: "10.10.10.1/32",
    },

    acl: {
      name: "BLOCK_APP",
      rule: "deny ip 192.168.40.0/24 host 10.10.40.50",
      action: "deny",
    },

    solution: {
      command: "no ip access-list extended BLOCK_APP",
    },
  },
    {
    id: 5,
    title: "NAT FAILURE",
    description: "The client can reach the router, but the application traffic cannot reach the server.",
    type: "nat-failure",

    topology: {
      pc: "192.168.50.10",
      switch: "VLAN 50",
      router: "G0/1",
      server: "10.10.50.50",
    },

    fault: {
      device: "ROUTER",
      interface: "G0/1",
      nat: "PAT",
      status: "missing",
    },

    router: {
      interface: "G0/1",
      ip: "10.10.50.1",
      connectedNetwork: "10.10.50.0/24",
      localRoute: "10.10.50.1/32",

      secondaryInterface: "G0/2",
      secondaryIp: "192.168.50.1",
      secondaryNetwork: "192.168.50.0/24",
      secondaryLocalRoute: "192.168.50.1/32",
    },

    nat: {
      type: "PAT",
      insideNetwork: "192.168.50.0/24",
      outsideInterface: "G0/1",
      translation: "192.168.50.10 -> 10.10.50.1",
    },

    solution: {
      command: "ip nat inside source list 10 interface G0/1 overload",
    },
  },
      {
    id: 6,
    title: "OSPF NEIGHBOR DOWN",
    description: "The application server is unreachable because the router has lost its OSPF adjacency with the Layer-3 switch.",
    type: "ospf-neighbor-down",

    topology: {
      pc: "192.168.60.10",
      switch: "10.10.60.2",
      router: "G0/1",
      server: "10.10.70.50",
    },

    fault: {
      device: "ROUTER",
      interface: "G0/1",
      protocol: "OSPF",
      status: "neighbor-down",
      neighbor: "10.10.60.2",
    },

    router: {
      interface: "G0/1",
      ip: "10.10.60.1",
      connectedNetwork: "10.10.60.0/24",
      localRoute: "10.10.60.1/32",

      secondaryInterface: "G0/2",
      secondaryIp: "10.10.70.1",
      secondaryNetwork: "10.10.70.0/24",
      secondaryLocalRoute: "10.10.70.1/32",
    },

    ospf: {
      processId: 1,
      neighbor: "10.10.60.2",
      neighborDevice: "L3 SWITCH",
      state: "DOWN",
      expectedState: "FULL",
      network: "10.10.60.0/24",
    },

    solution: {
      command: "network 10.10.60.0 0.0.0.255 area 0",
    },
  },
    {
    id: 7,
    title: "STP BLOCKING PORT",
    description: "A user cannot reach the application server because a switch port is stuck in the STP blocking state.",
    type: "stp-blocking",

    topology: {
      pc: "192.168.70.10",
      switch: "SW-A",
      router: "SW-B",
      server: "10.10.70.50",
    },

    fault: {
      device: "SWITCH",
      interface: "G0/1",
      protocol: "STP",
      status: "blocking",
    },

    stp: {
      rootBridge: "SW-A",
      localSwitch: "SW-B",
      interface: "G0/1",
      state: "blocking",
      expectedState: "forwarding",
    },

    solution: {
      command: "spanning-tree portfast",
    },
  },
    {
    id: 8,
    title: "DHCP FAILURE",
    description: "A user cannot access the network because the PC is not receiving an IP address.",
    type: "dhcp-failure",

    topology: {
      pc: "DHCP",
      switch: "VLAN 80",
      router: "G0/1",
      server: "10.10.80.50",
    },

    fault: {
      device: "ROUTER",
      interface: "G0/1",
      status: "dhcp-failure",
    },

    dhcp: {
      pool: "VLAN80_POOL",
      network: "192.168.80.0/24",
      gateway: "192.168.80.1",
      status: "inactive",
    },

    solution: {
      command: "no shutdown",
    },
  },
  {
    id: 9,
    title: "DNS FAILURE",
    description: "The client cannot reach the server because DNS resolution is failing.",
    type: "dns-failure",

    topology: {
      pc: "192.168.90.10",
      switch: "VLAN 90",
      router: "G0/1",
      server: "10.10.90.50",
    },

    fault: {
      device: "ROUTER",
      interface: "G0/1",
      status: "dns-failure",
    },

    dns: {
      server: "10.10.90.53",
      domain: "server.local",
      status: "inactive",
    },

    solution: {
      command: "ip name-server 10.10.90.53",
    },
  },
  {
    id: 10,
    title: "PORT SECURITY FAILURE",
    description: "The PC cannot communicate because the switch port is in a port-security violation state.",
    type: "port-security-failure",

    topology: {
      pc: "192.168.100.10",
      switch: "G0/1",
      router: "G0/1",
      server: "10.10.100.50",
    },

    fault: {
      device: "SWITCH",
      interface: "G0/1",
      status: "violation",
    },

    portSecurity: {
      maximum: 1,
      currentMacs: 2,
      violation: "shutdown",
      status: "err-disabled",
    },

    solution: {
      command: "shutdown / no shutdown",
    },
  },
  {
    id: 11,
    title: "BGP NEIGHBOR DOWN",
    description:
      "The router cannot exchange routes because the BGP neighbor is not established.",
    type: "bgp-neighbor-down",

    topology: {
      pc: "192.168.110.10",
      switch: "VLAN 110",
      router: "G0/1",
      server: "10.10.110.2",
    },

    fault: {
      device: "ROUTER",
      interface: "G0/1",
      status: "bgp-neighbor-down",
    },

    bgp: {
      localAs: "65001",
      neighbor: "10.10.110.2",
      remoteAs: "65002",
      state: "Idle",
      expectedState: "Established",
    },

    solution: {
      command: "neighbor 10.10.110.2 remote-as 65002",
    },
  },
  {
    id: 12,
    title: "MTU MISMATCH",
    description:
      "Traffic between the routers is failing because the interface MTU values do not match.",
    type: "mtu-mismatch",

    topology: {
      pc: "192.168.120.10",
      switch: "VLAN 120",
      router: "G0/1",
      server: "10.10.120.50",
    },

    fault: {
      device: "ROUTER",
      interface: "G0/1",
      status: "mtu-mismatch",
    },

    mtu: {
      local: 1400,
      expected: 1500,
      peer: "10.10.120.2",
      status: "mismatch",
    },

    solution: {
      command: "ip mtu 1500",
    },
  },
];

export default missions;