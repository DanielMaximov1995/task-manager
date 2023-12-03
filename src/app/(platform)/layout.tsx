import {PageAndLayoutType} from "@/types/others";
import RestrictedContent from "@/components/RestrictedContent";
import IndexLayout from "@/components/Platform/Index Layout";

const PlatformLayout = async (props : PageAndLayoutType) => {
    const { children , params } = props
    return (
        <RestrictedContent params={params}>
                <IndexLayout>
                    {children}
                </IndexLayout>
        </RestrictedContent>
    )
}
export default PlatformLayout
