import chalk from "chalk";
import format from "format-duration";
import duration from "humanize-duration";

export default class OtherUtils {
    /**
     * Format the time to hh:mm:ss
     * @param milliseconds Time to format in milliseconds
     * @param minimal Whether to choose minimal format 
     */
    public formatTime(milliseconds: number, minimal: boolean = true): string {
        if (!minimal) return duration(milliseconds, { round: true });
        // @ts-ignore
        return format(milliseconds, { leading: true });
    }

    /**
     * Format date
     * @param date Date object
     */
    public formatDate(date: Date): string {
        return new Intl.DateTimeFormat("vi", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
    }

    /**
     * Logging things
     * @param type The type of log to log
     * @param output Output message
     */
    public log(type: { type: "info" | "error" | "warning" }, output: string): void {
        const date: string = this.formatDate(new Date());
        switch (type.type.toLowerCase()) {
            case "info":
                console.log(chalk.white(`${date}\t[${type.type.toUpperCase()}]\t${output}`));
                break;
            case "warning":
                console.log(chalk.yellow(`${date}\t[${type.type.toUpperCase()}]\t${output}`));
                break;
            case "error":
                console.log(chalk.red(`${date}\t[${type.type.toUpperCase()}]\t${output}`));
                break;
        }
    }

    /**
     * Create a progress bar
     * @param minValue Minimum value of the bar
     * @param maxValue Maximum value of the bar
     * @param barSize Bar size
     */
    public createBar(minValue: number, maxValue: number, barSize: number): string {
        const percentage: number = minValue / maxValue;
        const progress: number = Math.round((10 * percentage));
        const emptyProgress: number = barSize - progress;
        const progressText: string = "⬜".repeat(progress);
        const emptyProgressText: string = "-".repeat(emptyProgress);
        return `\`${this.formatTime(minValue)} [${progressText + emptyProgressText}] ${this.formatTime(maxValue)}\``
    }
}
