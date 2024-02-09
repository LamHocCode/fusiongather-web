import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

const Content = () => {
    return (
        <section className="flex gap-8 py-10">
            <div className="w-[61%]">
                <LeftContent />
            </div>
            <div className="w-[39%]">
                <RightContent />
            </div>
        </section>
    );
}

export default Content;