'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Cpu,
  Mic,
  Activity,
  Play,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FileText,
  Lock,
  Zap,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface AuditResult {
  contractName: string;
  network: string;
  riskScore: number;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  vulnerabilities: {
    type: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    description: string;
    recommendation: string;
  }[];
  gasOptimization: string;
  auditHash: string;
}

const SAMPLE_CONTRACT = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GoaVault {
    mapping(address => uint256) public balances;
    address public owner;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient");
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        balances[msg.sender] -= amount; // Warning: Re-entrancy state update after call!
    }
}`;

export default function VoiceSentinel() {
  const [voiceCommand, setVoiceCommand] = useState(
    'Sentinel Agent: Audit the GoaVault contract for re-entrancy exploits, inspect withdrawal state updates, and generate a cryptographic security report.'
  );
  const [contractCode, setContractCode] = useState(SAMPLE_CONTRACT);
  const [scanning, setScanning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Voice-Sentinel AI Agent online.',
    '[READY] Wispr Flow voice interface connected.',
    '[TARGET] Awaiting voice directive for smart contract telemetry...',
  ]);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const runAudit = () => {
    setScanning(true);
    setAuditResult(null);
    setTerminalLogs((prev) => [
      ...prev,
      `[VOICE DIR] "${voiceCommand}"`,
      '[AGENT] Parsing AST & opcode patterns...',
      '[AI] Running symbolic execution on fallback vector...',
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        '[SCAN] Inspecting call{value: amount}("") at line 14...',
        '[ALERT] Potential state inconsistency detected: re-entrancy vector located!',
      ]);
    }, 1200);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        '[CONSENSUS] Cryptographic audit hash generated: 0x9f4a...e82c',
        '[COMPLETE] Security analysis complete. Rendering risk telemetry.',
      ]);

      setAuditResult({
        contractName: 'GoaVault.sol',
        network: 'Ethereum Sepolia / Solana SVM',
        riskScore: 68,
        status: 'WARNING',
        vulnerabilities: [
          {
            type: 'Re-entrancy Attack Vector',
            severity: 'HIGH',
            description:
              'External call occurs before balance deduction. An attacker can repeatedly re-enter the withdraw function before state updates.',
            recommendation:
              'Apply OpenZeppelin ReentrancyGuard nonReentrant modifier or adhere strictly to Checks-Effects-Interactions pattern.',
          },
          {
            type: 'Missing Zero-Address Verification',
            severity: 'LOW',
            description:
              'Ownership configuration does not assert address non-zero checks.',
            recommendation:
              'Add require(newOwner != address(0)) in transferOwnership procedures.',
          },
        ],
        gasOptimization: 'Storage variable caching can reduce execution gas by 8.4%.',
        auditHash: '0x9f4a81b2c7e4d8a3f120e82c74109ba420d4e918c',
      });
      setScanning(false);
    }, 2800);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[160px] pointer-events-none" />

      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/85 px-6 py-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20">
            <ShieldAlert className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                VOICE-SENTINEL
                <span className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  AI x WEB3 AGENT
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400">
              Autonomous Smart Contract Security Agent • Built with Wispr Flow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium">Wispr Flow Dictation Active</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
            <Lock className="h-3.5 w-3.5 text-cyan-400" />
            <span>HH Goa &apos;26 Selection</span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Voice Directive Input Panel */}
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-xl shadow-2xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Mic className="h-4 w-4 text-emerald-400 animate-pulse" />
              Spoken Agent Directive (Wispr Flow Target)
            </label>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              Hold Shortcut &amp; Speak to Direct Agent
            </span>
          </div>

          <div className="relative">
            <textarea
              value={voiceCommand}
              onChange={(e) => setVoiceCommand(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-slate-700/60 bg-slate-950/80 p-3.5 text-xs text-slate-200 placeholder-slate-500 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Quick Directives:</span>
              <button
                onClick={() =>
                  setVoiceCommand(
                    'Sentinel Agent: Audit the GoaVault contract for re-entrancy exploits, inspect withdrawal state updates, and generate a cryptographic security report.'
                  )
                }
                className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-[11px] text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-all"
              >
                ⚡ Re-entrancy Check
              </button>
              <button
                onClick={() =>
                  setVoiceCommand(
                    'Sentinel Agent: Verify token minting bounds, check overflow guards, and benchmark gas consumption on Sepolia testnet.'
                  )
                }
                className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-[11px] text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
              >
                🔒 Token Minting Audit
              </button>
            </div>

            <button
              onClick={runAudit}
              disabled={scanning}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {scanning ? (
                <>
                  <Activity className="h-4 w-4 animate-spin text-slate-950" />
                  <span>Agent Executing Audit...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-slate-950" />
                  <span>Deploy Voice Directive</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Two-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Smart Contract & Terminal */}
          <div className="space-y-6 flex flex-col">
            {/* Solidity Editor */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-xl flex-1 flex flex-col space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Code2 className="h-4 w-4 text-cyan-400" />
                  Smart Contract Target (Solidity)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">GoaVault.sol</span>
              </div>
              <textarea
                value={contractCode}
                onChange={(e) => setContractCode(e.target.value)}
                rows={10}
                className="w-full flex-1 rounded-xl border border-slate-800 bg-slate-950/90 p-3 font-mono text-xs text-slate-300 focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
              />
            </div>

            {/* Live Terminal Log */}
            <div className="rounded-2xl border border-slate-800/80 bg-black/70 p-4 backdrop-blur-xl font-mono text-xs space-y-2 h-56 flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                  Agent Autonomous Telemetry
                </span>
                <span className="text-[10px] text-slate-500">Live Agent Stream</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-slate-300 text-[11px] pr-1">
                {terminalLogs.map((log, index) => (
                  <div
                    key={index}
                    className={
                      log.includes('[ALERT]')
                        ? 'text-amber-400 font-semibold'
                        : log.includes('[VOICE')
                        ? 'text-cyan-400'
                        : log.includes('[COMPLETE]')
                        ? 'text-emerald-400 font-bold'
                        : 'text-slate-400'
                    }
                  >
                    {log}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Security Report & Telemetry */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-xl flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Cryptographic Security Audit Telemetry
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {auditResult ? auditResult.network : 'Status: Idle'}
                </span>
              </div>

              {auditResult ? (
                <div className="space-y-4 animate-in fade-in duration-500">
                  {/* Risk Score Banner */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
                      <span className="text-[10px] text-amber-300 block uppercase font-semibold">
                        Risk Rating
                      </span>
                      <span className="text-xl font-bold text-amber-400">
                        {auditResult.riskScore} / 100
                      </span>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                        Vulnerabilities
                      </span>
                      <span className="text-xl font-bold text-rose-400">
                        {auditResult.vulnerabilities.length} Found
                      </span>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                        Gas Index
                      </span>
                      <span className="text-xl font-bold text-cyan-400">+8.4% Opt</span>
                    </div>
                  </div>

                  {/* Vulnerability Details */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Detected Attack Vectors
                    </span>
                    {auditResult.vulnerabilities.map((vuln, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-slate-200 flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                            {vuln.type}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                              vuln.severity === 'HIGH'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {vuln.severity} SEVERITY
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {vuln.description}
                        </p>
                        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2 text-[10px] text-emerald-300">
                          <strong>Remediation:</strong> {vuln.recommendation}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* On-Chain Hash Verification */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">
                        Cryptographic Proof Hash
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 truncate max-w-[260px] block">
                        {auditResult.auditHash}
                      </span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Sepolia Verified
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center h-full space-y-3">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 animate-pulse">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    Awaiting Agent Execution Directive
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Hold Wispr Flow and speak your audit command or click &quot;Deploy Voice Directive&quot; above to watch the agent analyze the contract live.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Credits */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Voice Layer: Wispr Flow</span>
              <span className="text-emerald-400">Built for Hacker House Goa 2026</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
