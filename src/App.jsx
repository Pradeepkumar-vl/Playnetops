import { useState, useEffect } from "react";
import "./App.css";
import missions from "./missions";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [packetStep, setPacketStep] = useState(0);
  const [interfaceUp, setInterfaceUp] = useState(false);
  const [vlanFixed, setVlanFixed] = useState(false);
  const [routeFixed, setRouteFixed] = useState(false);
  const [aclFixed, setAclFixed] = useState(false);
  const [natFixed, setNatFixed] = useState(false);
  const [ospfFixed, setOspfFixed] = useState(false);
  const [stpFixed, setStpFixed] = useState(false);
  const [dhcpFixed, setDhcpFixed] = useState(false);
  const [dnsFixed, setDnsFixed] = useState(false);
  const [portSecurityFixed, setPortSecurityFixed] = useState(false);
  const [bgpFixed, setBgpFixed] = useState(false);
  const [mtuFixed, setMtuFixed] = useState(false);
  const [commandOutput, setCommandOutput] = useState("");
  const [missionComplete, setMissionComplete] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [routerMode, setRouterMode] = useState("exec");
  const [switchMode, setSwitchMode] = useState("exec");
  const [usedRouteCommand, setUsedRouteCommand] = useState(false);
  const [usedPingCommand, setUsedPingCommand] = useState(false);
  const activeMission = missions.find(
    (mission) => mission.id === selectedMission
  );
  const missionType = activeMission?.type;

useEffect(() => {
  if (!gameStarted) return;

  const timer = setInterval(() => {
    setPacketStep((step) => {

      // PC -> Switch
      if (step === 0) {

        // Mission 10: PC-connected switch port is err-disabled
        if (
          missionType === "port-security-failure" &&
          !portSecurityFixed
        ) {
          return 0;
        }

        return 1;
      }

      // Switch -> Router
      if (step === 1) {

        // Mission 02: packet cannot leave the switch
        // while VLAN is incorrect
        if (missionType === "wrong-vlan" && !vlanFixed) {
          return 0;
        }

        return 2;
      }

        // Packet reaches Router
        if (step === 2) {

          // Mission 01: Router interface must be UP
          if (missionType === "interface-down" && !interfaceUp) {
            return 0;
          }

          // Mission 03: Router has no route to the destination
          if (missionType === "missing-route" && !routeFixed) {
            return 0;
          }

          // Mission 04: ACL blocks traffic
          if (missionType === "acl-block" && !aclFixed) {
            return 0;
          }

          // Mission 05: NAT translation is missing
          if (missionType === "nat-failure" && !natFixed) {
            return 0;
          }

          // Mission 06: OSPF neighbor is down
          if (missionType === "ospf-neighbor-down" && !ospfFixed) {
            return 0;
          }

          // Mission 07: STP port is blocking
          if (missionType === "stp-blocking" && !stpFixed) {
            return 0;
          }

          // Mission 08: DHCP is not working
          if (missionType === "dhcp-failure" && !dhcpFixed) {
            return 0;
          }

          // Mission 09: DNS is not working
          if (missionType === "dns-failure" && !dnsFixed) {
            return 0;
          }

          // Mission 10: Port security violation
          if (
            missionType === "port-security-failure" &&
            !portSecurityFixed
          ) {
            return 0;
          }

          // Mission 11: BGP neighbor is not established
          if (
            missionType === "bgp-neighbor-down" &&
            !bgpFixed
          ) {
            return 0;
          }

          // Mission 12: MTU mismatch
          if (
            missionType === "mtu-mismatch" &&
            !mtuFixed
          ) {
            return 0;
          }

          return 3;
        }

        if (step === 3) {
          setMissionComplete(true);

          setTimeout(() => {
            setShowCompletionScreen(true);
          }, 10000);

          return 0;
        }

      return 0;
    });
  }, 1500);

  return () => clearInterval(timer);
}, [gameStarted, interfaceUp, vlanFixed, routeFixed, aclFixed, natFixed, ospfFixed, stpFixed, dhcpFixed, dnsFixed, portSecurityFixed, bgpFixed, mtuFixed, missionType]);

  return (
    <div className="game">
      <header className="header">
        <div className="logo">NetOpsAcademy</div>
        <div className="subtitle">NETWORK QUEST</div>
      </header>

      <main className="main">
        {!gameStarted ? (
          <>
            <div className="hero-icon">NETWORK OPERATIONS GAME</div>
            <h1>Test Your Networking Skills</h1>

            <p className="description">
              Learn networking concepts, solve challenges, and prove your
              NetOps skills.
            </p>

            <button
              className="start-button"
              onClick={() => {
                setGameStarted(true);
                setSelectedMission(null);
                setScore(100);
                setPacketStep(0);
                setInterfaceUp(false);
                setSelectedDevice(null);
                setCommandOutput("");
                setVlanFixed(false);
                setRouteFixed(false);
                setAclFixed(false);
                setNatFixed(false);
                setOspfFixed(false);
                setStpFixed(false);
                setDhcpFixed(false);
                setDnsFixed(false);
                setPortSecurityFixed(false);
                setBgpFixed(false);
                setMtuFixed(false);
                setMissionComplete(false);
                setRouterMode("exec");
                setUsedRouteCommand(false);
                setUsedPingCommand(false);
              }}
            >
              START GAME
            </button>

            <div className="topics">
              <span>Routing</span>
              <span>Switching</span>
              <span>Security</span>
              <span>Wireless</span>
              <span>SD-WAN</span>
            </div>
          </>
        ) : selectedMission === null ? (
            <>
    <div className="hero-icon">MISSION SELECT</div>

    <h1>CHOOSE YOUR MISSION</h1>

    <p className="description">
      Select a network challenge to begin.
    </p>

    <div className="mission-list">

      <button
        className="start-button"
        onClick={() => setSelectedMission(1)}
      >
        MISSION 01 - NETWORK UNDER ATTACK
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(2)}
      >
        MISSION 02 - VLAN MISMATCH
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(3)}
      >
        MISSION 03 - MISSING ROUTE
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(4)}
      >
        MISSION 04 - ACL BLOCKING TRAFFIC
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(5)}
      >
        MISSION 05 - NAT FAILURE
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(6)}
      >
        MISSION 06 - OSPF NEIGHBOR DOWN
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(7)}
      >
        MISSION 07 - STP BLOCKING PORT
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(8)}
      >
        MISSION 08 - DHCP FAILURE
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(9)}
      >
        MISSION 09 - DNS FAILURE
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(10)}
      >
        MISSION 10 - PORT SECURITY FAILURE
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(11)}
      >
        MISSION 11 - BGP NEIGHBOR DOWN
      </button>

      <button
        className="start-button"
        onClick={() => setSelectedMission(12)}
      >
        MISSION 12 - MTU MISMATCH
      </button>

    </div>
  </>
) : (
          <>

            {showCompletionScreen ? (
              <>
                <div className="hero-icon">MISSION COMPLETE</div>

                <h1>MISSION {selectedMission.toString().padStart(2, "0")} SOLVED</h1>

                <p className="description">
                  {missionType === "interface-down"
                    ? "You identified the failed router interface and restored connectivity."
                    : "You identified the VLAN mismatch and restored connectivity."}
                </p>

                <div className="mission-score">
                  <div>SCORE</div>
                  <strong>{score}</strong>
                </div>

                <button
                  className="start-button"
                  onClick={() => {
                    setGameStarted(false);
                    setSelectedDevice(null);
                    setPacketStep(0);
                    setInterfaceUp(false);
                    setCommandOutput("");
                    setMissionComplete(false);
                    setScore(0);
                  }}
                >
                  RETURN TO HQ
                </button>
              </>
            ) : (
              <>
              <div className="score-hud">
                SCORE: <strong>{score}</strong>
              </div>

                <div className="hero-icon">MISSION 01</div>
            <h1>{activeMission.title}</h1>

            <p className="description">
              {activeMission.description}
              Find the network problem.
            </p>

            <div className="topology">

              <div className="network-device">
                <div className="device-icon">PC</div>
                <div className="device-name">USER PC</div>
                <div className="device-ip">{activeMission.topology.pc}</div>
              </div>

              <div className="network-cable">
                <span></span>
                {packetStep === 0 && <div className="network-packet"></div>}
              </div>

                <button
                  className={`network-device ${
                    missionType === "wrong-vlan" && !vlanFixed ? "warning" : "healthy"
                  }`}
                  onClick={() => setSelectedDevice("SWITCH")}
                >
                <div className="device-icon">SW</div>
                <div className="device-name">SWITCH</div>
                <div className="device-vlan">{activeMission.topology.switch}</div>
                </button>

              <div className="network-cable">
                <span></span>
                {packetStep === 1 &&
                  !(missionType === "wrong-vlan" && !vlanFixed) && (
                    <div className="network-packet"></div>
                  )}
              </div>

              {packetStep === 1 &&
                missionType === "wrong-vlan" &&
                !vlanFixed && (
                  <div className="packet-dropped">
                    PACKET DROPPED
                  </div>
                )}
              <div className="router-wrapper">
                {packetStep === 2 && missionType === "interface-down" && !interfaceUp && (
                  <div className="packet-dropped">
                    PACKET DROPPED
                  </div>
                )}

                <button
                  className={`network-device ${
                    missionType === "interface-down" && !interfaceUp ? "warning" : "healthy"
                  }`}
                  onClick={() => {
                    if (
                      missionType === "interface-down" ||
                      missionType === "missing-route" ||
                      missionType === "acl-block" ||
                      missionType === "nat-failure" ||
                      missionType === "ospf-neighbor-down" ||
                      missionType === "dhcp-failure" ||
                      missionType === "dns-failure" ||
                      missionType === "bgp-neighbor-down" ||
                      missionType === "mtu-mismatch"
                    ) {
                      setSelectedDevice("ROUTER");
                    }
                  }}
                >
                  <div className="device-icon">RTR</div>
                  <div className="device-name">ROUTER</div>
                  <div className="device-interface">{activeMission.topology.router}</div>
                </button>
              </div>

              <div className={`network-cable ${
                  missionType === "interface-down" && !interfaceUp ? "broken" : ""
                }`}>
                <span></span>
                {packetStep === 3 && <div className="network-packet"></div>}
              </div>

              <div className="network-device">
                <div className="device-icon">
                  {missionType === "bgp-neighbor-down" ? "RTR" : "SRV"}
                </div>

                <div className="device-name">
                  {missionType === "bgp-neighbor-down" ? "ROUTER" : "SERVER"}
                </div>
                <div className="device-ip">{activeMission.topology.server}</div>
              </div>

            </div>

              {packetStep === 2 && missionType === "interface-down" && !interfaceUp && (
                <div className="packet-dropped">
                  PACKET DROPPED
                </div>
              )}

                {selectedDevice === "ROUTER" && missionType === "interface-down" && (
                  <div className="diagnostic-panel">
                    <h2>ROUTER DIAGNOSTICS</h2>

                    <p>
                      Interface:{" "}
                      <strong>{activeMission.fault.interface}</strong>
                    </p>

                    <div className="command-console">
                      <div className="console-line">
                        Router# <span>show ip interface brief</span>
                      </div>

                      <div className="console-output">
                        {activeMission.fault.interface}{" "}
                        {activeMission.router.ip} YES manual{" "}
                        <strong>{interfaceUp ? "up" : "down"}</strong>{" "}
                        {interfaceUp ? "up" : "down"}
                      </div>
                    </div>

                    <p>
                      Status:{" "}
                      <strong
                        className={interfaceUp ? "status-up" : "status-down"}
                      >
                        {interfaceUp ? "UP" : "DOWN"}
                      </strong>
                    </p>

                    <div className="command-options">

                      {routerMode === "exec" && (
                        <>
                          <p>Router# Select a command:</p>

                          <button
                            onClick={() => setCommandOutput("interface")}
                          >
                            show ip interface brief
                          </button>

                          <button
                            onClick={() => setRouterMode("config")}
                          >
                            configure terminal
                          </button>

                          <button
                            onClick={() => {
                              setCommandOutput("route");

                              if (!usedRouteCommand) {
                                setScore((currentScore) =>
                                  Math.max(0, currentScore - 10)
                                );
                                setUsedRouteCommand(true);
                              }
                            }}
                          >
                            show ip route
                          </button>

                          <button
                            onClick={() => {
                              setCommandOutput("ping");

                              if (!usedPingCommand) {
                                setScore((currentScore) =>
                                  Math.max(0, currentScore - 10)
                                );
                                setUsedPingCommand(true);
                              }
                            }}
                          >
                            ping {activeMission.topology.server}
                          </button>
                        </>
                      )}

                      {routerMode === "config" && (
                        <>
                          <p>Router(config)# Select a command:</p>

                          <button
                            onClick={() => setRouterMode("interface")}
                          >
                            interface {activeMission.fault.interface}
                          </button>

                          <button
                            onClick={() => setRouterMode("exec")}
                          >
                            end
                          </button>
                        </>
                      )}

                      {routerMode === "interface" && (
                        <>
                          <p>Router(config-if)# Select a command:</p>

                          <button
                            onClick={() => {
                              setInterfaceUp(true);
                              setCommandOutput("enabled");
                            }}
                          >
                            no shutdown
                          </button>

                          <button
                            onClick={() => setRouterMode("config")}
                          >
                            exit
                          </button>
                        </>
                      )}

                    </div>

                    {commandOutput === "interface" && (
                      <div className="command-output">
                        <div>Router# show ip interface brief</div>
                        <br />

                        <div>
                          Interface&nbsp;&nbsp;&nbsp;IP-Address&nbsp;&nbsp;&nbsp;Status&nbsp;&nbsp;&nbsp;Protocol
                        </div>

                        <div>
                          {activeMission.fault.interface}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {activeMission.router.ip}
                          &nbsp;&nbsp;&nbsp;
                          {interfaceUp ? "up" : "down"}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          {interfaceUp ? "up" : "down"}
                        </div>
                      </div>
                    )}

                    {commandOutput === "route" && (
                      <div className="command-output">
                        <div>Router# show ip route</div>
                        <br />

                        <div>Codes: C - connected, L - local</div>
                        <br />

                        <div>
                          C&nbsp;&nbsp;
                          {activeMission.router.connectedNetwork} is directly connected,{" "}
                          GigabitEthernet{activeMission.router.interface.replace("G", "")}
                        </div>

                        <div>
                          L&nbsp;&nbsp;
                          {activeMission.router.localRoute} is directly connected,{" "}
                          GigabitEthernet{activeMission.router.interface.replace("G", "")}
                        </div>

                        <div>
                          C&nbsp;&nbsp;
                          {activeMission.router.secondaryNetwork} is directly connected,{" "}
                          GigabitEthernet{activeMission.router.secondaryInterface.replace("G", "")}
                        </div>

                        <div>
                          L&nbsp;&nbsp;
                          {activeMission.router.secondaryLocalRoute} is directly connected,{" "}
                          GigabitEthernet{activeMission.router.secondaryInterface.replace("G", "")}
                        </div>
                      </div>
                    )}

                    {commandOutput === "ping" && (
                      <div className="command-output">
                        <div>
                          Router# ping {activeMission.topology.server}
                        </div>

                        <br />

                        {!interfaceUp ? (
                          <>
                            <div>Type escape sequence to abort.</div>
                            <div>
                              Sending 5, 100-byte ICMP Echos to{" "}
                              {activeMission.topology.server}...
                            </div>

                            <br />

                            <div>.....</div>
                            <div>Success rate is 0 percent (0/5)</div>
                          </>
                        ) : (
                          <>
                            <div>Type escape sequence to abort.</div>
                            <div>
                              Sending 5, 100-byte ICMP Echos to{" "}
                              {activeMission.topology.server}...
                            </div>

                            <br />

                            <div>!!!!!</div>
                            <div>Success rate is 100 percent (5/5)</div>
                          </>
                        )}
                      </div>
                    )}

                    {!interfaceUp && (
                      <p className="diagnostic-warning">
                        Interface {activeMission.fault.interface} is currently DOWN.
                        Troubleshoot the interface.
                      </p>
                    )}

                    {interfaceUp && commandOutput === "enabled" && (
                      <div className="command-output">
                        <div>
                          Router(config-if)# no shutdown
                        </div>

                        <br />

                        <div>
                          %LINK-5-CHANGED: Interface GigabitEthernet
                          {activeMission.router.interface.replace("G", "")},
                          changed state to UP
                        </div>

                        <div>
                          %LINEPROTO-5-UPDOWN: Line protocol on Interface
                          GigabitEthernet
                          {activeMission.router.interface.replace("G", "")},
                          changed state to UP
                        </div>
                      </div>
                    )}

                    {interfaceUp && (
                      <p className="status-up">
                        Interface enabled. Traffic can now reach the server.
                      </p>
                    )}
                  </div>
                )}
              
              {selectedDevice === "ROUTER" && missionType === "missing-route" && (
                <div className="diagnostic-panel">

                  <h2>ROUTER DIAGNOSTICS</h2>

                  <p>
                    Interface: <strong>G0/1</strong>
                  </p>

                  <div className="command-console">

                    <div className="console-line">
                      Router# <span>show ip route</span>
                    </div>

                    <div className="console-output">

                      <div>
                        C 10.10.10.0/24 is directly connected, G0/2
                      </div>

                      <div>
                        L 10.10.10.1/32 is directly connected, G0/2
                      </div>

                    <div>
                      {routeFixed
                        ? "S 10.10.30.0/24 [1/0] via 10.10.10.2"
                        : (
                          <>
                            C 10.10.30.0/24
                            <strong className="status-down">
                              &nbsp;&nbsp;NOT FOUND
                            </strong>
                          </>
                        )}
                    </div>

                    </div>

                  </div>

                  <p className="diagnostic-warning">
                    Destination network 10.10.30.0/24 is missing from the routing table.
                  </p>

                  <div className="command-options">

                    <p>Router# Select a command:</p>

                    <button
                      onClick={() => setCommandOutput("route")}
                    >
                      show ip route
                    </button>

                    <button
                      onClick={() => setCommandOutput("ping")}
                    >
                      ping 10.10.30.50
                    </button>

                  </div>

                  {commandOutput === "route" && (
                    <div className="command-output">

                      <div>Router# show ip route</div>

                      <br />

                      <div>
                        C 10.10.10.0/24 is directly connected, G0/2
                      </div>

                      <div>
                        L 10.10.10.1/32 is directly connected, G0/2
                      </div>

                      <br />

                    {routeFixed ? (
                      <div className="status-up">
                        S 10.10.30.0/24 [1/0] via 10.10.10.2
                      </div>
                    ) : (
                      <div className="diagnostic-warning">
                        % Network 10.10.30.0/24 not found
                      </div>
                    )}

                    </div>
                  )}

                  {commandOutput === "ping" && (
                    <div className="command-output">

                      <div>Router# ping 10.10.30.50</div>

                      <br />

                      <div>
                        Type escape sequence to abort.
                      </div>

                      <div>
                        Sending 5, 100-byte ICMP Echos to 10.10.30.50
                      </div>

                      <br />

                      <div className="diagnostic-warning">
                        ..... 
                      </div>

                    <div className={routeFixed ? "status-up" : "diagnostic-warning"}>
                      {routeFixed
                        ? "!!!!!"
                        : "....."}
                    </div>

                    <div>
                      Success rate is {routeFixed ? "100 percent (5/5)" : "0 percent (0/5)"}
                    </div>

                    </div>
                  )}

                  {!routeFixed && (
                    <>
                      <p className="diagnostic-warning">
                        No route exists for the destination network.
                      </p>

                      <div className="command-options">
                        <p>Router# Select a command:</p>

                        <button
                          onClick={() => setCommandOutput("configure-route")}
                        >
                          configure terminal
                        </button>
                      </div>

                      {commandOutput === "configure-route" && (
                        <div className="command-output">

                          <div>Router# configure terminal</div>

                          <br />

                          <div>
                            Router(config)# ip route 10.10.30.0 255.255.255.0 10.10.10.2
                          </div>

                          <button
                            className="start-button"
                            onClick={() => {
                              setRouteFixed(true);
                              setCommandOutput("");
                              console.log("Mission 03 route fixed:", true);
                            }}
                          >
                            APPLY COMMAND
                          </button>

                        </div>
                      )}
                    </>
                  )}

                  {routeFixed && (
                    <p className="status-up">
                      Route added successfully. Traffic can now reach the destination network.
                    </p>
                  )}

                </div>
              )}

              {selectedDevice === "ROUTER" && missionType === "acl-block" && (
                <div className="diagnostic-panel">

                  <h2>ROUTER ACL DIAGNOSTICS</h2>

                  <p>
                    Interface: <strong>G0/1</strong>
                  </p>

                  <div className="command-console">

                    <div className="console-line">
                      Router# <span>show access-lists</span>
                    </div>

                    <div className="console-output">

                      <div>
                        Extended IP access list BLOCK_APP
                      </div>

                      <div>
                        10 deny ip 192.168.40.0/24 host 10.10.40.50
                      </div>

                      <div>
                        20 permit ip any any
                      </div>

                    </div>

                  </div>

                  <p className="diagnostic-warning">
                    Traffic from 192.168.40.0/24 to 10.10.40.50 is being denied.
                  </p>

                  <div className="command-options">

                    <p>Router# Select a command:</p>

                    <button
                      onClick={() => setCommandOutput("acl")}
                    >
                      show access-lists
                    </button>

                    <button
                      onClick={() => setCommandOutput("acl-ping")}
                    >
                      ping 10.10.40.50
                    </button>

                    <button
                      onClick={() => setCommandOutput("acl-config")}
                    >
                      configure terminal
                    </button>

                  </div>

                  {commandOutput === "acl" && (
                    <div className="command-output">

                      <div>Router# show access-lists</div>

                      <br />

                      <div>
                        Extended IP access list BLOCK_APP
                      </div>

                      <div>
                        10 deny ip 192.168.40.0/24 host 10.10.40.50
                      </div>

                      <div>
                        20 permit ip any any
                      </div>

                    </div>
                  )}

                  {commandOutput === "acl-ping" && (
                    <div className="command-output">

                      <div>Router# ping 10.10.40.50</div>

                      <br />

                      <div>Type escape sequence to abort.</div>

                      <div>
                        Sending 5, 100-byte ICMP Echos to 10.10.40.50
                      </div>

                      <br />

                      <div className="diagnostic-warning">
                        .....
                      </div>

                      <div>
                        Success rate is 0 percent (0/5)
                      </div>

                    </div>
                  )}

                  {!aclFixed && commandOutput === "acl-config" && (
                    <div className="command-output">

                      <div>Router# configure terminal</div>

                      <br />

                      <div>
                        Router(config)# no ip access-list extended BLOCK_APP
                      </div>

                      <button
                        className="start-button"
                        onClick={() => {
                          setAclFixed(true);
                          setCommandOutput("");
                        }}
                      >
                        APPLY COMMAND
                      </button>

                    </div>
                  )}

                  {!aclFixed && (
                    <p className="diagnostic-warning">
                      ACL BLOCK_APP is blocking the application traffic.
                    </p>
                  )}

                  {aclFixed && (
                    <p className="status-up">
                      ACL BLOCK_APP removed. Traffic is now permitted.
                    </p>
                  )}

                </div>
              )}

              {selectedDevice === "ROUTER" && missionType === "nat-failure" && (
                <div className="diagnostic-panel">

                  <h2>ROUTER NAT DIAGNOSTICS</h2>

                  <p>
                    Interface: <strong>G0/1</strong>
                  </p>

                  <div className="command-console">

                    <div className="console-line">
                      Router# <span>show ip nat translations</span>
                    </div>

                    <div className="console-output">

                      <div>
                        Pro Inside global      Inside local
                      </div>

                      <div>
                        --------------------   --------------------
                      </div>

                      <div className="diagnostic-warning">
                        No active translations
                      </div>

                    </div>

                  </div>

                  <p className="diagnostic-warning">
                    No NAT translation exists for the client traffic.
                  </p>

                  <div className="command-options">

                    <p>Router# Select a command:</p>

                    <button
                      onClick={() => setCommandOutput("nat")}
                    >
                      show ip nat translations
                    </button>

                    <button
                      onClick={() => setCommandOutput("nat-statistics")}
                    >
                      show ip nat statistics
                    </button>

                    <button
                      onClick={() => setCommandOutput("nat-config")}
                    >
                      configure terminal
                    </button>

                  </div>

                  {commandOutput === "nat" && (
                    <div className="command-output">

                      <div>Router# show ip nat translations</div>

                      <br />

                      {natFixed ? (
                        <>
                          <div>
                            Pro Inside global      Inside local
                          </div>

                          <div>
                            10.10.50.1             192.168.50.10
                          </div>

                          <br />

                          <div className="status-up">
                            NAT translation is active.
                          </div>
                        </>
                      ) : (
                        <div className="diagnostic-warning">
                          No active translations
                        </div>
                      )}

                    </div>
                  )}

                  {commandOutput === "nat-statistics" && (
                    <div className="command-output">

                      <div>Router# show ip nat statistics</div>

                      <br />

                      <div>
                        Inside interfaces: G0/2
                      </div>

                      <div>
                        Outside interfaces: G0/1
                      </div>

                      <br />

                      <div className={natFixed ? "status-up" : "diagnostic-warning"}>
                        Active translations: {natFixed ? "1" : "0"}
                      </div>

                    </div>
                  )}

                  {!natFixed && commandOutput === "nat-config" && (
                    <div className="command-output">

                      <div>Router# configure terminal</div>

                      <br />

                      <div>
                        Router(config)# ip nat inside source list 10 interface G0/1 overload
                      </div>

                      <button
                        className="start-button"
                        onClick={() => {
                          setNatFixed(true);
                          setCommandOutput("");
                        }}
                      >
                        APPLY COMMAND
                      </button>

                    </div>
                  )}

                  {!natFixed && (
                    <p className="diagnostic-warning">
                      PAT configuration is missing.
                    </p>
                  )}

                  {natFixed && (
                    <p className="status-up">
                      NAT/PAT configured successfully. Client traffic can now be translated.
                    </p>
                  )}

                </div>
              )}

                {selectedDevice === "ROUTER" && missionType === "ospf-neighbor-down" && (
                  <div className="diagnostic-panel">

                    <h2>ROUTER OSPF DIAGNOSTICS</h2>

                    <p>
                      Interface: <strong>G0/1</strong>
                    </p>

                    <div className="command-console">

                      <div className="console-line">
                        Router# <span>show ip ospf neighbor</span>
                      </div>

                      <div className="console-output">

                        <div>
                          Neighbor ID        State
                        </div>

                        <div>
                          ----------------   --------
                        </div>

                        <div className="diagnostic-warning">
                          10.10.60.2          DOWN
                        </div>

                      </div>

                    </div>

                    <p className="diagnostic-warning">
                      OSPF neighbor 10.10.60.2 (L3 SWITCH) is not in FULL state.
                    </p>

                    <div className="command-options">

                      <p>Router# Select a command:</p>

                      <button
                        onClick={() => setCommandOutput("ospf-neighbor")}
                      >
                        show ip ospf neighbor
                      </button>

                      <button
                        onClick={() => setCommandOutput("ospf-interface")}
                      >
                        show ip ospf interface
                      </button>

                      <button
                        onClick={() => setCommandOutput("ospf-config")}
                      >
                        configure terminal
                      </button>

                    </div>

                    {commandOutput === "ospf-neighbor" && (
                      <div className="command-output">

                        <div>Router# show ip ospf neighbor</div>

                        <br />

                        <div>
                          Neighbor ID        State
                        </div>

                        <div>
                          10.10.60.2          DOWN
                        </div>

                      </div>
                    )}

                    {commandOutput === "ospf-interface" && (
                      <div className="command-output">

                        <div>Router# show ip ospf interface</div>

                        <br />

                        <div>
                          GigabitEthernet0/1
                        </div>

                        <div>
                          OSPF process 1
                        </div>

                        <div>
                          Network: 10.10.60.0/24
                        </div>

                        <br />

                        <div className="diagnostic-warning">
                          OSPF network 10.10.60.0/24 is not active.
                        </div>

                      </div>
                    )}

                    {!ospfFixed && commandOutput === "ospf-config" && (
                      <div className="command-output">

                        <div>Router# configure terminal</div>

                        <br />

                        <div>
                          Router(config)# router ospf 1
                        </div>

                        <div>
                          Router(config-router)# network 10.10.60.0 0.0.0.255 area 0
                        </div>

                        <button
                          className="start-button"
                          onClick={() => {
                            setOspfFixed(true);
                            setCommandOutput("");
                          }}
                        >
                          APPLY COMMAND
                        </button>

                      </div>
                    )}

                    {!ospfFixed && (
                      <p className="diagnostic-warning">
                        OSPF adjacency with the L3 switch is down.
                      </p>
                    )}

                    {ospfFixed && (
                      <p className="status-up">
                        OSPF adjacency established. Neighbor 10.10.60.2 is now FULL.
                      </p>
                    )}

                  </div>
                )}

                {selectedDevice === "ROUTER" && missionType === "dhcp-failure" && (
                  <div className="diagnostic-panel">
                    <h2>ROUTER DHCP DIAGNOSTICS</h2>

                    <p>
                      Interface: <strong>{activeMission.fault.interface}</strong>
                    </p>

                    <p className="diagnostic-warning">
                      DHCP service is not providing addresses to the client.
                    </p>

                    <div className="command-options">

                      <p>Router# Select a command:</p>

                      <button
                        onClick={() => setCommandOutput("dhcp-binding")}
                      >
                        show ip dhcp binding
                      </button>

                      <button
                        onClick={() => setCommandOutput("dhcp-pool")}
                      >
                        show ip dhcp pool
                      </button>

                      <button
                        onClick={() => setCommandOutput("dhcp-config")}
                      >
                        configure terminal
                      </button>

                    </div>

                    {commandOutput === "dhcp-binding" && (
                      <div className="command-output">
                        <div>Router# show ip dhcp binding</div>

                        <br />

                        <div>
                          IP address&nbsp;&nbsp;&nbsp;&nbsp;Client ID
                        </div>

                        <div>
                          ------------------------------
                        </div>

                        <div className="diagnostic-warning">
                          No bindings found
                        </div>
                      </div>
                    )}

                    {commandOutput === "dhcp-pool" && (
                      <div className="command-output">
                        <div>Router# show ip dhcp pool</div>

                        <br />

                        <div>
                          Pool: {activeMission.dhcp.pool}
                        </div>

                        <div>
                          Network: {activeMission.dhcp.network}
                        </div>

                        <div>
                          Default Gateway: {activeMission.dhcp.gateway}
                        </div>

                        <div className="diagnostic-warning">
                          DHCP pool is inactive.
                        </div>
                      </div>
                    )}

                    {!dhcpFixed && commandOutput === "dhcp-config" && (
                      <div className="command-output">
                        <div>Router# configure terminal</div>

                        <br />

                        <div>
                          Router(config)# ip dhcp pool {activeMission.dhcp.pool}
                        </div>

                        <div>
                          Router(dhcp-config)# network 192.168.80.0 255.255.255.0
                        </div>

                        <div>
                          Router(dhcp-config)# default-router 192.168.80.1
                        </div>

                        <button
                          className="start-button"
                          onClick={() => {
                            setDhcpFixed(true);
                            setCommandOutput("");
                          }}
                        >
                          APPLY COMMAND
                        </button>
                      </div>
                    )}

                    {!dhcpFixed && (
                      <p className="diagnostic-warning">
                        DHCP pool {activeMission.dhcp.pool} is not active.
                        The client cannot obtain an IP address.
                      </p>
                    )}

                    {dhcpFixed && (
                      <p className="status-up">
                        DHCP pool configured successfully. The client can now obtain an IP address.
                      </p>
                    )}

                  </div>
                )}

                {selectedDevice === "ROUTER" && missionType === "dns-failure" && (
                  <div className="diagnostic-panel">
                    <h2>ROUTER DNS DIAGNOSTICS</h2>

                    <p>
                      DNS Server:{" "}
                      <strong>{activeMission.dns.server}</strong>
                    </p>

                    <p>
                      Domain:{" "}
                      <strong>{activeMission.dns.domain}</strong>
                    </p>

                    {!dnsFixed && (
                      <p className="diagnostic-warning">
                        DNS resolution is not working.
                      </p>
                    )}

                    <div className="command-options">

                      <p>Router# Select a command:</p>

                      <button
                        onClick={() => setCommandOutput("dns")}
                      >
                        show ip dns
                      </button>

                      <button
                        onClick={() => setCommandOutput("hosts")}
                      >
                        show hosts
                      </button>

                      <button
                        onClick={() => setCommandOutput("dns-config")}
                      >
                        configure terminal
                      </button>

                    </div>

                    {commandOutput === "dns" && (
                      <div className="command-output">
                        <div>Router# show ip dns</div>
                        <br />

                        <div>
                          DNS Server: {activeMission.dns.server}
                        </div>

                        {dnsFixed ? (
                          <div className="status-up">
                            DNS lookup service is operational.
                          </div>
                        ) : (
                          <div className="diagnostic-warning">
                            DNS lookup service is not responding.
                          </div>
                        )}
                      </div>
                    )}

                    {commandOutput === "hosts" && (
                      <div className="command-output">
                        <div>Router# show hosts</div>
                        <br />

                        <div>
                          Domain: {activeMission.dns.domain}
                        </div>

                        {dnsFixed ? (
                          <div className="status-up">
                            Name resolution is working.
                          </div>
                        ) : (
                          <div className="diagnostic-warning">
                            Name resolution failed.
                          </div>
                        )}
                      </div>
                    )}

                    {commandOutput === "dns-config" && !dnsFixed && (
                      <div className="command-output">
                        <div>Router# configure terminal</div>
                        <br />

                        <div>
                          Router(config)# {activeMission.solution.command}
                        </div>

                        <button
                          className="start-button"
                          onClick={() => {
                            setDnsFixed(true);
                            setCommandOutput("");
                          }}
                        >
                          APPLY COMMAND
                        </button>
                      </div>
                    )}

                    {dnsFixed && (
                      <p className="status-up">
                        DNS configuration applied successfully. Name resolution is now working.
                      </p>
                    )}

                  </div>
                )}

                {selectedDevice === "ROUTER" && missionType === "bgp-neighbor-down" && (
                  <div className="diagnostic-panel">
                    <h2>ROUTER BGP DIAGNOSTICS</h2>

                    <p>
                      Local AS: <strong>{activeMission.bgp.localAs}</strong>
                    </p>

                    <p>
                      Neighbor: <strong>{activeMission.bgp.neighbor}</strong>
                    </p>

                    <p>
                      Remote AS: <strong>{activeMission.bgp.remoteAs}</strong>
                    </p>

                    <p>
                      BGP State:{" "}
                      <strong className={bgpFixed ? "status-up" : "status-down"}>
                        {bgpFixed ? "Established" : activeMission.bgp.state}
                      </strong>
                    </p>

                    <div className="command-options">

                      <p>Router# Select a command:</p>

                      <button
                        onClick={() => setCommandOutput("bgp-summary")}
                      >
                        show ip bgp summary
                      </button>

                      <button
                        onClick={() => setCommandOutput("bgp-neighbor")}
                      >
                        show ip bgp neighbors
                      </button>

                      <button
                        onClick={() => setRouterMode("config")}
                      >
                        configure terminal
                      </button>

                    </div>

                    {commandOutput === "bgp-summary" && (
                      <div className="command-output">
                        <div>Router# show ip bgp summary</div>
                        <br />

                        <div>
                          Local AS: {activeMission.bgp.localAs}
                        </div>

                        <div>
                          Neighbor: {activeMission.bgp.neighbor}
                        </div>

                        <div>
                          Remote AS: {activeMission.bgp.remoteAs}
                        </div>

                        <div>
                          State:{" "}
                          <strong className={bgpFixed ? "status-up" : "status-down"}>
                            {bgpFixed ? "Established" : "Idle"}
                          </strong>
                        </div>
                      </div>
                    )}

                    {commandOutput === "bgp-neighbor" && (
                      <div className="command-output">
                        <div>Router# show ip bgp neighbors</div>
                        <br />

                        <div>
                          BGP neighbor: {activeMission.bgp.neighbor}
                        </div>

                        <div>
                          Remote AS: {activeMission.bgp.remoteAs}
                        </div>

                        <div>
                          BGP state:{" "}
                          {bgpFixed ? "Established" : "Idle"}
                        </div>
                      </div>
                    )}

                    {!bgpFixed && routerMode === "config" && (
                      <div className="command-output">
                        <p>Router(config)# Select a command:</p>

                        <button
                          onClick={() => setRouterMode("bgp")}
                        >
                          router bgp {activeMission.bgp.localAs}
                        </button>

                        <button
                          onClick={() => setRouterMode("exec")}
                        >
                          end
                        </button>
                      </div>
                    )}

                    {!bgpFixed && routerMode === "bgp" && (
                      <div className="command-output">
                        <p>Router(config-router)# Select a command:</p>

                        <button
                          onClick={() => {
                            setBgpFixed(true);
                            setCommandOutput("bgp-fixed");
                          }}
                        >
                          {activeMission.solution.command}
                        </button>

                        <button
                          onClick={() => setRouterMode("config")}
                        >
                          exit
                        </button>
                      </div>
                    )}

                    {commandOutput === "bgp-fixed" && bgpFixed && (
                      <div className="command-output">
                        <div>
                          Router(config-router)# {activeMission.solution.command}
                        </div>

                        <br />

                        <div>
                          BGP neighbor {activeMission.bgp.neighbor} is now Established.
                        </div>

                        <div>
                          % Configuration applied successfully.
                        </div>
                      </div>
                    )}

                    {!bgpFixed ? (
                      <p className="diagnostic-warning">
                        BGP neighbor {activeMission.bgp.neighbor} is currently Idle.
                      </p>
                    ) : (
                      <p className="status-up">
                        BGP neighbor established successfully. Routes can now be exchanged.
                      </p>
                    )}

                  </div>
                )}

                {selectedDevice === "ROUTER" && missionType === "mtu-mismatch" && (
                  <div className="diagnostic-panel">
                    <h2>ROUTER MTU DIAGNOSTICS</h2>

                    <p>
                      Interface:{" "}
                      <strong>{activeMission.fault.interface}</strong>
                    </p>

                    <p>
                      Local MTU:{" "}
                      <strong>{activeMission.mtu.local}</strong>
                    </p>

                    <p>
                      Expected MTU:{" "}
                      <strong>{activeMission.mtu.expected}</strong>
                    </p>

                    <p>
                      Peer:{" "}
                      <strong>{activeMission.mtu.peer}</strong>
                    </p>

                    <div className="command-options">
                      <p>Router# Select a command:</p>

                      <button
                        onClick={() => setCommandOutput("mtu-interface")}
                      >
                        show interfaces
                      </button>

                      <button
                        onClick={() => setCommandOutput("mtu-ip")}
                      >
                        show ip interface
                      </button>

                      <button
                        onClick={() => setRouterMode("config")}
                      >
                        configure terminal
                      </button>
                    </div>

                    {commandOutput === "mtu-interface" && (
                      <div className="command-output">
                        <div>Router# show interfaces</div>
                        <br />

                        <div>
                          Interface: {activeMission.fault.interface}
                        </div>

                        <div>
                          MTU: {mtuFixed
                            ? activeMission.mtu.expected
                            : activeMission.mtu.local}
                        </div>

                        <div>
                          Peer MTU: {activeMission.mtu.expected}
                        </div>

                        {!mtuFixed && (
                          <div className="diagnostic-warning">
                            MTU mismatch detected.
                          </div>
                        )}

                        {mtuFixed && (
                          <div className="status-up">
                            MTU matches the expected value.
                          </div>
                        )}
                      </div>
                    )}

                    {commandOutput === "mtu-ip" && (
                      <div className="command-output">
                        <div>Router# show ip interface</div>
                        <br />

                        <div>
                          Interface: {activeMission.fault.interface}
                        </div>

                        <div>
                          MTU: {mtuFixed
                            ? activeMission.mtu.expected
                            : activeMission.mtu.local}
                        </div>

                        <div>
                          Status: UP
                        </div>
                      </div>
                    )}

                    {!mtuFixed && routerMode === "config" && (
                      <div className="command-output">
                        <p>Router(config)# Select a command:</p>

                        <button
                          onClick={() => setRouterMode("interface")}
                        >
                          interface {activeMission.fault.interface}
                        </button>

                        <button
                          onClick={() => setRouterMode("exec")}
                        >
                          end
                        </button>
                      </div>
                    )}

                    {!mtuFixed && routerMode === "interface" && (
                      <div className="command-output">
                        <p>Router(config-if)# Select a command:</p>

                        <button
                          onClick={() => {
                            setMtuFixed(true);
                            setCommandOutput("mtu-fixed");
                          }}
                        >
                          {activeMission.solution.command}
                        </button>

                        <button
                          onClick={() => setRouterMode("config")}
                        >
                          exit
                        </button>
                      </div>
                    )}

                    {commandOutput === "mtu-fixed" && mtuFixed && (
                      <div className="command-output">
                        <div>
                          Router(config-if)# {activeMission.solution.command}
                        </div>

                        <br />

                        <div>
                          Interface MTU changed to {activeMission.mtu.expected}.
                        </div>

                        <div>
                          % Configuration applied successfully.
                        </div>
                      </div>
                    )}

                    {!mtuFixed ? (
                      <p className="diagnostic-warning">
                        MTU mismatch detected. Local MTU is{" "}
                        {activeMission.mtu.local}, expected{" "}
                        {activeMission.mtu.expected}.
                      </p>
                    ) : (
                      <p className="status-up">
                        MTU mismatch resolved. Interface MTU is now{" "}
                        {activeMission.mtu.expected}.
                      </p>
                    )}
                  </div>
                )}

              {selectedDevice === "SWITCH" && missionType === "wrong-vlan" && (
                <div className="diagnostic-panel">
                  <h2>SWITCH DIAGNOSTICS</h2>

                  <p>
                    Interface:{" "}
                    <strong>{activeMission.fault.interface}</strong>
                  </p>

                  <p>
                    Current VLAN:{" "}
                    <strong>
                      {vlanFixed
                        ? activeMission.fault.expectedVlan
                        : activeMission.fault.vlan}
                    </strong>
                  </p>

                  <p>
                    Expected VLAN:{" "}
                    <strong>{activeMission.fault.expectedVlan}</strong>
                  </p>

                  <div className="command-options">

                    {switchMode === "exec" && (
                      <>
                        <p>Switch# Select a command:</p>

                        <button
                          onClick={() => setCommandOutput("switch-vlan")}
                        >
                          show vlan
                        </button>

                        <button
                          onClick={() => setCommandOutput("switch-interface")}
                        >
                          show interfaces
                        </button>

                        <button
                          onClick={() => setSwitchMode("config")}
                        >
                          configure terminal
                        </button>
                      </>
                    )}

                    {switchMode === "config" && (
                      <>
                        <p>Switch(config)# Select a command:</p>

                        <button
                          onClick={() => setSwitchMode("interface")}
                        >
                          interface {activeMission.fault.interface}
                        </button>

                        <button
                          onClick={() => setSwitchMode("exec")}
                        >
                          end
                        </button>
                      </>
                    )}

                    {switchMode === "interface" && (
                      <>
                        <p>Switch(config-if)# Select a command:</p>

                        <button
                          onClick={() => {
                            setVlanFixed(true);
                            setCommandOutput("vlan-fixed");
                          }}
                        >
                          {activeMission.solution.command}
                        </button>

                        <button
                          onClick={() => setSwitchMode("config")}
                        >
                          exit
                        </button>
                      </>
                    )}

                  </div>

                  {commandOutput === "switch-vlan" && (
                    <div className="command-output">
                      <div>Switch# show vlan</div>
                      <br />

                      <div>
                        Interface {activeMission.fault.interface} is assigned to VLAN{" "}
                        {activeMission.fault.vlan}
                      </div>

                      <div>
                        Expected VLAN: {activeMission.fault.expectedVlan}
                      </div>
                    </div>
                  )}

                  {commandOutput === "switch-interface" && (
                    <div className="command-output">
                      <div>Switch# show interfaces</div>
                      <br />

                      <div>
                        Interface: {activeMission.fault.interface}
                      </div>

                      <div>
                        Access VLAN: {activeMission.fault.vlan}
                      </div>

                      <div>
                        Expected VLAN: {activeMission.fault.expectedVlan}
                      </div>
                    </div>
                  )}

                  {commandOutput === "vlan-fixed" && vlanFixed && (
                    <div className="command-output">
                      <div>
                        Switch(config-if)# {activeMission.solution.command}
                      </div>

                      <br />

                      <div>
                        Interface {activeMission.fault.interface} assigned to VLAN{" "}
                        {activeMission.fault.expectedVlan}
                      </div>

                      <div>
                        % Configuration applied successfully.
                      </div>
                    </div>
                  )}

                  {!vlanFixed ? (
                    <p className="diagnostic-warning">
                      Interface {activeMission.fault.interface} is assigned to VLAN{" "}
                      {activeMission.fault.vlan}. Expected VLAN{" "}
                      {activeMission.fault.expectedVlan}.
                    </p>
                  ) : (
                    <p className="status-up">
                      VLAN mismatch resolved. Traffic can now reach the server.
                    </p>
                  )}
                </div>
              )}

              {selectedDevice === "SWITCH" && missionType === "stp-blocking" && (
                <div className="diagnostic-panel">
                  <h2>SWITCH STP DIAGNOSTICS</h2>

                  <p>
                    Interface:{" "}
                    <strong>{activeMission.fault.interface}</strong>
                  </p>

                  <p>
                    STP State:{" "}
                    <strong className={stpFixed ? "status-up" : "status-down"}>
                      {stpFixed ? "FORWARDING" : "BLOCKING"}
                    </strong>
                  </p>

                  <p>
                    Root Bridge:{" "}
                    <strong>{activeMission.stp.rootBridge}</strong>
                  </p>

                  <div className="command-options">

                    {switchMode === "exec" && (
                      <>
                        <p>Switch# Select a command:</p>

                        <button
                          onClick={() => setCommandOutput("stp")}
                        >
                          show spanning-tree
                        </button>

                        <button
                          onClick={() => setCommandOutput("stp-interface")}
                        >
                          show spanning-tree interface
                        </button>

                        <button
                          onClick={() => setSwitchMode("config")}
                        >
                          configure terminal
                        </button>
                      </>
                    )}

                    {switchMode === "config" && (
                      <>
                        <p>Switch(config)# Select a command:</p>

                        <button
                          onClick={() => setSwitchMode("interface")}
                        >
                          interface {activeMission.fault.interface}
                        </button>

                        <button
                          onClick={() => setSwitchMode("exec")}
                        >
                          end
                        </button>
                      </>
                    )}

                    {switchMode === "interface" && (
                      <>
                        <p>Switch(config-if)# Select a command:</p>

                        <button
                          onClick={() => {
                            setStpFixed(true);
                            setCommandOutput("stp-fixed");
                          }}
                        >
                          {activeMission.solution.command}
                        </button>

                        <button
                          onClick={() => setSwitchMode("config")}
                        >
                          exit
                        </button>
                      </>
                    )}

                  </div>

                  {commandOutput === "stp" && (
                    <div className="command-output">
                      <div>Switch# show spanning-tree</div>
                      <br />

                      <div>
                        Root Bridge: {activeMission.stp.rootBridge}
                      </div>

                      <div>
                        Interface {activeMission.stp.interface}:{" "}
                        <strong>{activeMission.stp.state}</strong>
                      </div>

                      <div>
                        Expected State: {activeMission.stp.expectedState}
                      </div>
                    </div>
                  )}

                  {commandOutput === "stp-interface" && (
                    <div className="command-output">
                      <div>Switch# show spanning-tree interface</div>
                      <br />

                      <div>
                        Interface: {activeMission.stp.interface}
                      </div>

                      <div>
                        STP State: {activeMission.stp.state}
                      </div>

                      <div>
                        Root Bridge: {activeMission.stp.rootBridge}
                      </div>
                    </div>
                  )}

                  {commandOutput === "stp-fixed" && stpFixed && (
                    <div className="command-output">
                      <div>
                        Switch(config-if)# {activeMission.solution.command}
                      </div>

                      <br />

                      <div>
                        Interface {activeMission.stp.interface} is now forwarding.
                      </div>

                      <div>
                        % Configuration applied successfully.
                      </div>
                    </div>
                  )}

                  {!stpFixed ? (
                    <p className="diagnostic-warning">
                      Interface {activeMission.stp.interface} is currently BLOCKING.
                      Traffic cannot proceed toward the server.
                    </p>
                  ) : (
                    <p className="status-up">
                      STP issue resolved. Interface is now FORWARDING.
                    </p>
                  )}

                </div>
              )}

              {selectedDevice === "SWITCH" && missionType === "port-security-failure" && (
                <div className="diagnostic-panel">
                  <h2>SWITCH PORT SECURITY DIAGNOSTICS</h2>

                  <p>
                    Interface:{" "}
                    <strong>{activeMission.fault.interface}</strong>
                  </p>

                  <p>
                    Port Status:{" "}
                    <strong className={portSecurityFixed ? "status-up" : "status-down"}>
                      {portSecurityFixed ? "UP" : "ERR-DISABLED"}
                    </strong>
                  </p>

                  <p>
                    Maximum MAC Addresses:{" "}
                    <strong>{activeMission.portSecurity.maximum}</strong>
                  </p>

                  <p>
                    Current MAC Addresses:{" "}
                    <strong>{activeMission.portSecurity.currentMacs}</strong>
                  </p>

                  <div className="command-options">

                    <p>Switch# Select a command:</p>

                    <button
                      onClick={() => setCommandOutput("port-security")}
                    >
                      show port-security
                    </button>

                    <button
                      onClick={() => setCommandOutput("port-security-interface")}
                    >
                      show port-security interface
                    </button>

                    <button
                      onClick={() => setSwitchMode("config")}
                    >
                      configure terminal
                    </button>

                  </div>

                  {commandOutput === "port-security" && (
                    <div className="command-output">
                      <div>Switch# show port-security</div>
                      <br />

                      <div>
                        Interface: {activeMission.fault.interface}
                      </div>

                      <div>
                        Maximum MAC Addresses: {activeMission.portSecurity.maximum}
                      </div>

                      <div>
                        Current MAC Addresses: {activeMission.portSecurity.currentMacs}
                      </div>

                      <div className="diagnostic-warning">
                        Security Violation: {activeMission.portSecurity.violation}
                      </div>
                    </div>
                  )}

                  {commandOutput === "port-security-interface" && (
                    <div className="command-output">
                      <div>Switch# show port-security interface</div>
                      <br />

                      <div>
                        Interface: {activeMission.fault.interface}
                      </div>

                      <div>
                        Status:{" "}
                        {portSecurityFixed ? "Secure-Up" : "Secure-shutdown"}
                      </div>

                      <div>
                        Violation Mode: {activeMission.portSecurity.violation}
                      </div>
                    </div>
                  )}

                  {switchMode === "config" && (
                    <div className="command-output">
                      <p>Switch(config)# Select a command:</p>

                      <button
                        onClick={() => setSwitchMode("interface")}
                      >
                        interface {activeMission.fault.interface}
                      </button>

                      <button
                        onClick={() => setSwitchMode("exec")}
                      >
                        end
                      </button>
                    </div>
                  )}

                  {switchMode === "interface" && (
                    <div className="command-output">
                      <p>Switch(config-if)# Select a command:</p>

                      <button
                        onClick={() => {
                          setPortSecurityFixed(true);
                          setCommandOutput("port-security-fixed");
                        }}
                      >
                        shutdown / no shutdown
                      </button>

                      <button
                        onClick={() => setSwitchMode("config")}
                      >
                        exit
                      </button>
                    </div>
                  )}

                  {commandOutput === "port-security-fixed" && portSecurityFixed && (
                    <div className="command-output">
                      <div>
                        Switch(config-if)# shutdown
                      </div>

                      <div>
                        Switch(config-if)# no shutdown
                      </div>

                      <br />

                      <div>
                        Interface {activeMission.fault.interface} recovered successfully.
                      </div>

                      <div>
                        % Configuration applied successfully.
                      </div>
                    </div>
                  )}

                  {!portSecurityFixed ? (
                    <p className="diagnostic-warning">
                      Interface {activeMission.fault.interface} is ERR-DISABLED
                      because of a port-security violation.
                    </p>
                  ) : (
                    <p className="status-up">
                      Port security issue resolved. Interface is UP.
                    </p>
                  )}

                </div>
              )}
            <button
              className="start-button"
              onClick={() => {
                setGameStarted(false);
                setSelectedDevice(null);
                setPacketStep(0);
                setInterfaceUp(false);
                setVlanFixed(false);
                setSwitchMode("exec");
              }}
            >
              EXIT MISSION
            </button>
              </>
            )}
          </>
        )}
      </main>

      <footer>
        <p>NetOpsAcademy Game - Learn. Practice. Master.</p>
      </footer>
    </div>
  );
}

export default App;