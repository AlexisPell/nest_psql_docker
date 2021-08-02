import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {v4} from 'uuid';
import fs from 'fs';
import path from 'path';

@Injectable()
export class FilesService {
	async createFile(file: any): Promise<string> {
		try {
			const fileName = v4() + '.jpg';
			const filePath = path.resolve(__dirname, '..', 'static');
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, {recursive: true});
			}
			fs.writeFileSync(path.join(filePath, fileName), file.buffer as any);
			return fileName;
		} catch (error) {
			throw new InternalServerErrorException(
				'Some server error during uploading file...',
			);
		}
	}
}
