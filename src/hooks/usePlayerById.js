import { useSelect } from "@wordpress/data";

export const usePlayerById = (playerId, fields = "id,name") =>
	useSelect(
		(select) => {
			if (!playerId) {
				return null;
			}

			const users = select("core").getUsers({
				include: [playerId],
				per_page: 1,
				_fields: fields,
			});

			return Array.isArray(users) ? users[0] || null : null;
		},
		[playerId, fields],
	);
