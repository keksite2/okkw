// Anti-debugging and code protection utilities
class SecurityManager {
  private static instance: SecurityManager;
  private debuggerDetected = false;
  private devToolsOpen = false;

  private constructor() {
    this.initProtection();
  }

  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  private initProtection(): void {
    // Detect developer tools
    this.detectDevTools();
    
    // Disable right-click context menu
    this.disableContextMenu();
    
    // Disable common keyboard shortcuts
    this.disableKeyboardShortcuts();
    
    // Detect debugger
    this.detectDebugger();
    
    // Obfuscate console
    this.obfuscateConsole();
  }

  private detectDevTools(): void {
    const threshold = 160;
    
    const detectDevTools = () => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!this.devToolsOpen) {
          this.devToolsOpen = true;
          this.handleSecurityViolation('Developer tools detected');
        }
      } else {
        this.devToolsOpen = false;
      }
    };

    setInterval(detectDevTools, 500);
  }

  private disableContextMenu(): void {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }

  private disableKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
      if (e.keyCode === 123 || 
          (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
          (e.ctrlKey && e.keyCode === 85) ||
          (e.ctrlKey && e.shiftKey && e.keyCode === 67)) {
        e.preventDefault();
        return false;
      }
    });
  }

  private detectDebugger(): void {
    const detectDebugger = () => {
      const start = performance.now();
      debugger;
      const end = performance.now();
      
      if (end - start > 100) {
        if (!this.debuggerDetected) {
          this.debuggerDetected = true;
          this.handleSecurityViolation('Debugger detected');
        }
      }
    };

    setInterval(detectDebugger, 1000);
  }

  private obfuscateConsole(): void {
    const noop = () => {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 'time', 'timeLog', 'timeEnd', 'timeStamp'];
    
    methods.forEach(method => {
      (console as any)[method] = noop;
    });
  }

  private handleSecurityViolation(reason: string): void {
    // Log security violation (in production, you might want to send this to your server)
    console.warn(`Security violation detected: ${reason}`);
    
    // Optional: Redirect or show warning
    // window.location.href = 'about:blank';
  }

  public encryptString(str: string): string {
    return btoa(encodeURIComponent(str));
  }

  public decryptString(str: string): string {
    return decodeURIComponent(atob(str));
  }
}

// Initialize security manager
export const security = SecurityManager.getInstance();

// Export utility functions
export const encrypt = (data: string): string => security.encryptString(data);
export const decrypt = (data: string): string => security.decryptString(data);