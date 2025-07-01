// Tools Base JavaScript - Sidebar and Common Functionality

class ToolsApp {
    constructor() {
        this.sidebar = null;
        this.menuToggle = null;
        this.sidebarClose = null;
        this.overlay = null;
        this.isSidebarOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.bindEvents();
        this.setActiveNavItem();
    }
    
    setupElements() {
        this.sidebar = document.querySelector('.tools-sidebar');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.sidebarClose = document.querySelector('.sidebar-close');
        this.overlay = document.querySelector('.sidebar-overlay');
    }
    
    bindEvents() {
        // Menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.openSidebar());
        }
        
        // Sidebar close button
        if (this.sidebarClose) {
            this.sidebarClose.addEventListener('click', () => this.closeSidebar());
        }
        
        // Overlay click to close sidebar
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeSidebar());
        }
        
        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isSidebarOpen) {
                this.closeSidebar();
            }
        });
        
        // Auto-close sidebar when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Don't close for external links or if it's the current page
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('#') && !link.classList.contains('active')) {
                    this.closeSidebar();
                }
            });
        });
    }
    
    openSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.add('active');
        }
        if (this.overlay) {
            this.overlay.classList.add('active');
        }
        this.isSidebarOpen = true;
        document.body.style.overflow = 'hidden';
    }
    
    closeSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.remove('active');
        }
        if (this.overlay) {
            this.overlay.classList.remove('active');
        }
        this.isSidebarOpen = false;
        document.body.style.overflow = '';
    }
    
    setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href)) {
                link.classList.add('active');
            }
        });
    }
}

// Utility functions
const ToolsUtils = {
    // Format numbers with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Show notification
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },
    
    // Copy to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            ToolsUtils.showNotification('Copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            ToolsUtils.showNotification('Copied to clipboard!', 'success');
        }
    },
    
    // Download file
    downloadFile: (content, filename, type = 'text/plain') => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    // Validate email
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validate URL
    isValidUrl: (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ToolsApp();
});

// Export for use in other scripts
window.ToolsApp = ToolsApp;
window.ToolsUtils = ToolsUtils; 