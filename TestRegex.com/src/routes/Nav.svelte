<nav>
    <div class="nav-section" id="heading">
        <a href="/"><h1>TestRegex</h1></a>
    </div>

    <div class="nav-section" id="regex">
        <div>
            <ul class="flavour-list">
                <li>PCRE</li>
                <li>ECMAScript</li>
            </ul>
        </div>
        <button>Save</button>
        <button>Settings</button>
    </div>

    <div class="nav-section" id="tools">
        <button>Function</button>
        <button>Code generator</button>
    </div>
</nav>

<style>
    nav {
        display: flex;
        width: 100%;
        border-bottom: 1px solid var(--border-color);
    }

    nav .nav-section {
        padding: 0.25rem 2rem;
        display: flex;
        gap: 1rem;
        border-left: 1px solid var(--border-color);
        align-items: center;
        justify-content: center;
    }

    #heading {
        flex-basis: 20%
    }

    #regex {
        flex-basis: 50%;
        gap: 6rem;
    }
    
    #tools {
        flex-basis: 30%;
        flex-grow: 1;
    }

    h1, a, li {
        text-decoration: none;
        font-weight: 400;
        color: white;
    }
</style>