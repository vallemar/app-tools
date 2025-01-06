<script lang="ts">
    import { lc } from '~/helpers/locale';
</script>

<gesturerootview rows="auto">
    <lottie async={true} autoPlay={true} height={400} loop={false} src="~/assets/lottie/firework.lottie" width="100%" />
    <label horizontalAlignment="center" textAlignment="center" textWrap={true} verticalAlignment="center" width="80%">
        <span fontSize={42} fontWeight="bold" text={lc('thank_you')} />
        <span fontSize={22} text={'\n\n' + lc('thank_you_subtitle')} />
    </label>
</gesturerootview>
