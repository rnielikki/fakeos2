import { Path } from './filesystem';
import { DirectoryInfo } from './fileinfo';

export default {
    System:Path.getAbsolutePath("C:/System") as DirectoryInfo,
    Program:Path.getAbsolutePath("C:/Program") as DirectoryInfo,
    User:Path.getAbsolutePath("C:/User") as DirectoryInfo,
    Images:Path.getAbsolutePath("C:/User/Images") as DirectoryInfo,
    Document:Path.getAbsolutePath("C:/User/Documents") as DirectoryInfo,
    Desktop:Path.getAbsolutePath("C:/User/Desktop") as DirectoryInfo,
    Music:Path.getAbsolutePath("C:/User/Musics") as DirectoryInfo
}