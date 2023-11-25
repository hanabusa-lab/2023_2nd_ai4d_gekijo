import tkinter as tk
from tkinter import messagebox
import requests
from io import BytesIO
from PIL import Image, ImageTk
import datetime
from openai import OpenAI
import webbrowser
import os
import urllib.request
import time


def on_right_click(event):
    try:
        # Create a menu
        right_click_menu = tk.Menu(root, tearoff=0)
        right_click_menu.add_command(label="コピーしたものをはりつける", command=lambda: text_input.event_generate("<<Paste>>"))

        # Display the menu
        right_click_menu.tk_popup(event.x_root, event.y_root)
    finally:
        # Make sure to release the menu to avoid a memory leak
        right_click_menu.grab_release()

# 

# Function to read API keys from the file
def read_api_keys(file_path):
    try:
        with open(file_path, 'r') as file:
            return [line.strip() for line in file.readlines()]
    except FileNotFoundError:
        messagebox.showerror("Error", "keys.txt file not found.")
        return []
    

# Function to download and save the image
def download_image():
    global api_key_index
    api_key = api_keys[api_key_index]
    error_label.config(text="", fg="red")
    user_input = text_input.get()
    current_time = datetime.datetime.now().strftime("%H_%M_%S")
    
    if (user_input == 'api0'):
        api_key_index = 0
        error_label.config(text="API"+str(api_key_index), fg="blue")
        return 
    elif (user_input == 'api1'):
        api_key_index = 1
        error_label.config(text="API"+str(api_key_index), fg="blue")
        return 
    elif (user_input == 'api2'):
        api_key_index = 2
        error_label.config(text="API"+str(api_key_index), fg="blue")
        return
    elif (user_input == ''):
        error_label.config(text="文字を入れてね！", fg="red")
        return
    

    print('api_key_index: ', api_key_index)
    print('api_key: ', api_key)
    print('user input:', user_input)
    print('name: ', "マンガ_" + str(current_time) +".jpg")
        
    try:
        
        # Replace YOUR_API_KEY with your OpenAI API key
        client = OpenAI(api_key = api_key)
        
        # Call the API
        response = client.images.generate(
        model="dall-e-3",
        prompt=user_input,
        size="1024x1024",
        quality="standard",
        n=1,
        )

        # Show the result that has been pushed to an url
        # webbrowser.open(response.data[0].url)
        urllib.request.urlretrieve(response.data[0].url, "マンガ_" + str(current_time) +".jpg")
        text_input.delete(0, tk.END)  # Clear the text input
        error_label.config(text="ダウンロードをおしたら１分くらいまってね！", fg="blue")
        
    
    except Exception as e:
        error_label.config(text="エラー！せんせいをよんでね！", fg="red")
    
    # text_input.delete(0, tk.END)  # Clear the text input


# GUI setup
root = tk.Tk()
root.title("Image Downloader")

# Error message label
error_label = tk.Label(root, text="", fg="red")
error_label.pack(side=tk.TOP)

# Read API keys from file
api_keys = read_api_keys("keys.txt")
api_key_index = 0

# Larger font for widgets
large_font = ('Meiryo', 12)  # Example font and size

# User input with increased size and font
text_input = tk.Entry(root, width=20, font=large_font)  # Adjust the width as needed
text_input.pack(side=tk.LEFT, padx=1, pady=1)  # Added padding for better layout

# Download button with increased size and font
download_button = tk.Button(root, text="ダウンロード", command=download_image, font=large_font, height=2, width=20)  # Adjust height and width as needed
download_button.pack(side=tk.LEFT, padx=10, pady=10)  # Added padding for better layout
text_input.bind("<Button-3>", on_right_click)  # Bind right-click event


error_label.config(text="ダウンロードをおしたら１分くらいまってね！", fg="blue")

root.mainloop()

