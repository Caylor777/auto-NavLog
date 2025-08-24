import tkinter
import tkinter.messagebox
import customtkinter

customtkinter.set_appearance_mode("System")  # Modes: "System" (standard), "Dark", "Light"
customtkinter.set_default_color_theme("blue")  # Themes: "blue" (standard), "green", "dark-blue"


class App(customtkinter.CTk):
    def __init__(self):
        super().__init__()

        # configure window
        self.title("auto NavLog")
        self.geometry(f"{1690}x{580}")

        # configure grid layout 
        self.grid_columnconfigure(2, weight=1)
        self.grid_rowconfigure(0, weight=1)

        # create sidebar frame with widgets
        self.sidebar_frame = customtkinter.CTkFrame(self, width=140, corner_radius=0)
        self.sidebar_frame.grid(row=0, column=0, rowspan=4, sticky="nsew")
        self.sidebar_frame.grid_rowconfigure(4, weight=1)
        self.logo_label = customtkinter.CTkLabel(self.sidebar_frame, text="auto NavLog", font=customtkinter.CTkFont(size=20, weight="bold"))
        self.logo_label.grid(row=0, column=0, padx=20, pady=(20, 10))
        self.sidebar_button_1 = customtkinter.CTkButton(self.sidebar_frame, text="Add point", command=self.add_row)
        self.sidebar_button_1.grid(row=1, column=0, padx=20, pady=10)
        self.sidebar_button_2 = customtkinter.CTkButton(self.sidebar_frame, text="remove point", command=self.remove_row)
        self.sidebar_button_2.grid(row=2, column=0, padx=20, pady=10)
        self.sidebar_button_3 = customtkinter.CTkButton(self.sidebar_frame)
        self.sidebar_button_3.grid(row=3, column=0, padx=20, pady=10)
        self.appearance_mode_label = customtkinter.CTkLabel(self.sidebar_frame, text="Appearance Mode:", anchor="w")
        self.appearance_mode_label.grid(row=5, column=0, padx=20, pady=(10, 0))
        self.appearance_mode_optionemenu = customtkinter.CTkOptionMenu(self.sidebar_frame, values=["Light", "Dark", "System"],
                                                                       command=self.change_appearance_mode_event)
        self.appearance_mode_optionemenu.grid(row=6, column=0, padx=20, pady=(10, 10))
        self.scaling_label = customtkinter.CTkLabel(self.sidebar_frame, text="UI Scaling:", anchor="w")
        self.scaling_label.grid(row=7, column=0, padx=20, pady=(10, 0))
        self.scaling_optionemenu = customtkinter.CTkOptionMenu(self.sidebar_frame, values=["80%", "90%", "100%", "110%", "120%"],
                                                               command=self.change_scaling_event)
        self.scaling_optionemenu.grid(row=8, column=0, padx=20, pady=(10, 20))

        # create scrollable frame
        self.scrollable_frame = customtkinter.CTkScrollableFrame(self, label_text="Calculations")
        self.scrollable_frame.grid(row=0, column=2, padx=(20, 20), pady=(0, 0), sticky="nsew")
        self.scrollable_frame.grid_columnconfigure(0, weight=1)
        self.scrollable_frame_frames = []
        self.labels_frames = customtkinter.CTkFrame(master=self.scrollable_frame, height=50, corner_radius=0)
        self.labels_frames.grid(row=len(self.scrollable_frame_frames) + 1, column=0, padx=10, pady=(0, 20))
        self.labels_frames.grid_columnconfigure(12, weight=1)
        true_course_label = customtkinter.CTkLabel(self.labels_frames, width=100, text="True Course")
        true_course_label.grid(row=0, column=0, padx=5, pady=5)
        wind_direction_label = customtkinter.CTkLabel(self.labels_frames, width=100, text="Wind Dev")
        wind_direction_label.grid(row=0, column=1, padx=5, pady=5)
        wind_speed_label = customtkinter.CTkLabel(self.labels_frames, width=100, text="Wind Speed")
        wind_speed_label.grid(row=0, column=2, padx=5, pady=5)
        tempture_label = customtkinter.CTkLabel(self.labels_frames, width=100, text="Tempture")
        tempture_label.grid(row=0, column=3, padx=5, pady=5)
        compass_deviation_label = customtkinter.CTkLabel(self.labels_frames, width=100, text="Compass Dev")
        compass_deviation_label.grid(row=0, column=4, padx=5, pady=5)
        fuel_flow_label = customtkinter.CTkLabel(self.labels_frames, width=100, text="Fuel Flow (gph)")
        fuel_flow_label.grid(row=0, column=5, padx=5, pady=5)
        wind_correction_angle_result = customtkinter.CTkLabel(self.labels_frames, width=100, text="WAC")
        wind_correction_angle_result.grid(row=0, column=6, padx=5, pady=5)
        true_heading_result = customtkinter.CTkLabel(self.labels_frames, width=100, text="True Heading")
        true_heading_result.grid(row=0, column=7, padx=5, pady=5)
        compass_heading_result = customtkinter.CTkLabel(self.labels_frames, width=100, text="Compass Heading")
        compass_heading_result.grid(row=0, column=8, padx=5, pady=5)
        magnetic_heading_result = customtkinter.CTkLabel(self.labels_frames, width=100, text="Magnetic Heading")
        magnetic_heading_result.grid(row=0, column=9, padx=5, pady=5)
        ground_speed_result = customtkinter.CTkLabel(self.labels_frames, width=100, text="Ground Speed")
        ground_speed_result.grid(row=0, column=10, padx=5, pady=5)
        time_enroute_result = customtkinter.CTkLabel(self.labels_frames, width=100, text="Time Enroute")
        time_enroute_result.grid(row=0, column=11, padx=5, pady=5)
        fuel_used_result = customtkinter.CTkLabel(self.labels_frames, width=100, text="Fuel Used")
        fuel_used_result.grid(row=0, column=12, padx=5, pady=5)

        # set default values
        self.sidebar_button_3.configure(state="disabled", text="Disabled CTkButton")
        self.appearance_mode_optionemenu.set("Dark")
        self.scaling_optionemenu.set("100%")

    def change_appearance_mode_event(self, new_appearance_mode: str):
        customtkinter.set_appearance_mode(new_appearance_mode)

    def change_scaling_event(self, new_scaling: str):
        new_scaling_float = int(new_scaling.replace("%", "")) / 100
        customtkinter.set_widget_scaling(new_scaling_float)
        
    def add_row(self):
        frame = customtkinter.CTkFrame(master=self.scrollable_frame, height=50, corner_radius=0)
        frame.grid(row=len(self.scrollable_frame_frames) + 2, column=0, padx=10, pady=(0, 20))
        frame.grid_columnconfigure(12, weight=1)
        true_course_entry = customtkinter.CTkEntry(frame, width=100, placeholder_text="True Course")
        true_course_entry.grid(row=0, column=0, padx=5, pady=5)
        wind_direction_entry = customtkinter.CTkEntry(frame, width=100, placeholder_text="Wind Dev")
        wind_direction_entry.grid(row=0, column=1, padx=5, pady=5)
        wind_speed_entry = customtkinter.CTkEntry(frame, width=100, placeholder_text="Wind Speed")
        wind_speed_entry.grid(row=0, column=2, padx=5, pady=5)
        tempture_entry = customtkinter.CTkEntry(frame, width=100, placeholder_text="Tempture")
        tempture_entry.grid(row=0, column=3, padx=5, pady=5)
        compass_deviation_entry = customtkinter.CTkEntry(frame, width=100, placeholder_text="Compass Dev")
        compass_deviation_entry.grid(row=0, column=4, padx=5, pady=5)
        fuel_flow_entry = customtkinter.CTkEntry(frame, width=100, placeholder_text="Fuel Flow (gph)")
        fuel_flow_entry.grid(row=0, column=5, padx=5, pady=5)
        wind_correction_angle_result = customtkinter.CTkLabel(frame, width=100, text="WAC")
        wind_correction_angle_result.grid(row=0, column=6, padx=5, pady=5)
        true_heading_result = customtkinter.CTkLabel(frame, width=100, text="True Heading")
        true_heading_result.grid(row=0, column=7, padx=5, pady=5)
        compass_heading_result = customtkinter.CTkLabel(frame, width=100, text="Compass Heading")
        compass_heading_result.grid(row=0, column=8, padx=5, pady=5)
        magnetic_heading_result = customtkinter.CTkLabel(frame, width=100, text="Magnetic Heading")
        magnetic_heading_result.grid(row=0, column=9, padx=5, pady=5)
        ground_speed_result = customtkinter.CTkLabel(frame, width=100, text="Ground Speed")
        ground_speed_result.grid(row=0, column=10, padx=5, pady=5)
        time_enroute_result = customtkinter.CTkLabel(frame, width=100, text="Time Enroute")
        time_enroute_result.grid(row=0, column=11, padx=5, pady=5)
        fuel_used_result = customtkinter.CTkLabel(frame, width=100, text="Fuel Used")
        fuel_used_result.grid(row=0, column=12, padx=5, pady=5)
        
        self.scrollable_frame_frames.append(frame)
        
    def remove_row(self):
        self.scrollable_frame_frames[len(self.scrollable_frame_frames) - 2].destroy()
        self.scrollable_frame_frames.pop(len(self.scrollable_frame_frames) - 2)

if __name__ == "__main__":
    app = App()
    app.mainloop()
