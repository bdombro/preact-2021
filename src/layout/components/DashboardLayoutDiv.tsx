import styled from '~/lib/styled'

export default styled.div`
	:root {
		--header-height: 48px;
		--sidebarRight-width: 200px;
		
		--sidebar-width-full: 200px;
		--sidebar-width-mini: 52px;
		--sidebar-width: var(--sidebar-width-full);

		--bottom-nav-height: 44px;

		--body-height: calc( 100vh - var(--header-height) );
		--margin-bottom: 0;
		--margin-left: var(--sidebar-width);
	}

	@media (max-width: 600px) {
		:root {
			--body-height: calc( 100vh - var(--header-height) - var(--bottom-nav-height) );
			--margin-bottom: var(--bottom-nav-height);
			--margin-left: 0;
		}
	}

	:root {
		background: var(--body);
		overflow: hidden;
		margin-top: var(--header-height);
		margin-bottom: var(--margin-bottom);
		margin-left: var(--margin-left);
	}

	.miniSidebar :root {
		--sidebar-width: var(--sidebar-width-mini);
	}
`
