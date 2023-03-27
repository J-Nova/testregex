<script>
    import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error.message}</h1>

<style>
    h1 {
        color: white;
    }
</style>