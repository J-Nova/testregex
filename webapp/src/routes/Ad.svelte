<script>
    import logo from "$lib/assets/site_icon.png";
    import Icon from '@iconify/svelte';
</script>

<div>
    <a href="/">
        <h1>
            <img src="{logo}" alt="Site Icon">
            <span>Test</span><span>Regex</span>
        </h1>
    </a>
    <div class="container">
        
        <span class="social">
            <Icon icon="carbon:logo-github" color="black"/> 
            <a href="https://github.com/J-Nova/testregex">Github</a>
        </span>
        <span class="social">
            <Icon icon="carbon:logo-linkedin" color="black"/> 
            <a href="https://www.linkedin.com/in/juup-pikkemaat/">LinkedIn</a>
        </span>
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

    .social {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 5%;
    }
</style>