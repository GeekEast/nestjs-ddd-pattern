export class AlarmSeverity {
    constructor(readonly value: "critical" | "high" | "medium" | "low") { }

    // compare equality by attribute value, not by reference
    equals(severity: AlarmSeverity) {
        return this.value === severity.value;
    }

    static fromString(severity: string): AlarmSeverity {
        return new AlarmSeverity(severity as "critical" | "high" | "medium" | "low");
    }
}