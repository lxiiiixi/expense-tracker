export const commonConfig = ({ title, subtitle }: { title: string; subtitle: string }) => ({
    title: {
        text: title,
        subtext: subtitle,
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
});
