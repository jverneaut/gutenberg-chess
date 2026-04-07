import { useSelect } from "@wordpress/data";

export const useCurrentUserId = () =>
	useSelect((select) => select("core").getCurrentUser?.()?.id || 0, []);
