<script>
import logo from "$lib/assets/site_icon.png";
</script>

<div>
    <a href="/">
        <h1>
            <img src="{logo}" alt="Site Icon">
            <span>Test</span><span>Regex</span>
        </h1>
    </a>
    <div class="container">
        <span>This is an placeholder for an container</span>
    </div>
</div>

<style>
    .container {
        padding: 6px;
        background-color: var(--primary);
        cursor: default;
    }

    h1 {
        display: flex;
        align-items: center;
    }

    img { 
        height: 25%;
        width: 25%;
        padding-right: 5%;
    }
</style>