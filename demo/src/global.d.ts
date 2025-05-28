interface KPIID {
  init(): void;
}

interface Window {
  KPIID: KPIID;
}