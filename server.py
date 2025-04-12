import http.server
import socketserver
import os
import webbrowser
from threading import Timer

# Set the port
PORT = 8000

# Change to the directory containing the HTML files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Create the handler
Handler = http.server.SimpleHTTPRequestHandler

# Create the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server started at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    
    # Open the browser automatically
    def open_browser():
        webbrowser.open(f"http://localhost:{PORT}/html/index.html")
    
    # Open browser after a short delay
    Timer(1.5, open_browser).start()
    
    # Start the server
    httpd.serve_forever() 