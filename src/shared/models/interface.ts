export interface StudentData {
    id: number;
    name: string;
    number: number;
    email: string;
    attendance: AttendanceDetails[]
}

export interface AttendanceDetails {
    status: string;
    date: Date;
    id: number;
}

export interface StudentFormData {
    id: number;
    name: string;
    number: number;
    email: string;
}

export interface IdData {
    id: number;
    name: string;
}

export interface AttendanceFormData {
    id: number;
    status: string;
    date: Date;
}

export interface AssignAttendance {
    date: string;
    status: string;
}