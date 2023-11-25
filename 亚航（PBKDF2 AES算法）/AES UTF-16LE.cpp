#include <iostream>
#include <cstdio>
#include <string>
#include <openssl/evp.h>
#include <boost/beast/core/detail/base64.hpp>
#include <boost/archive/iterators/base64_from_binary.hpp>
#include <boost/archive/iterators/transform_width.hpp>
#include <codecvt>
#include <locale>
using namespace std;
using namespace boost::archive::iterators;

// Note: the first parameter `wide_text` is UTF-16LE, not UTF-8
string aes_encrypt(const wstring& wide_text, const unsigned char* key, const unsigned char* iv) {
    EVP_CIPHER_CTX* ctx = EVP_CIPHER_CTX_new();
    if (!ctx) {
        return "";
    }

    if (EVP_EncryptInit_ex(ctx, EVP_aes_256_cbc(), nullptr, key, iv) != 1) {
        EVP_CIPHER_CTX_free(ctx);
        return "";
    }

    EVP_CIPHER_CTX_set_padding(ctx, 1);

    int out_len = wide_text.size() * 2 + EVP_CIPHER_CTX_block_size(ctx); // Double the size for UTF-16LE
    unsigned char* ciphertext = new unsigned char[out_len];

    if (EVP_EncryptUpdate(ctx, ciphertext, &out_len, reinterpret_cast<const unsigned char*>(wide_text.c_str()), wide_text.size() * 2) != 1) {
        delete[] ciphertext;
        EVP_CIPHER_CTX_free(ctx);
        return "";
    }

    int final_len;
    if (EVP_EncryptFinal_ex(ctx, ciphertext + out_len, &final_len) != 1) {
        delete[] ciphertext;
        EVP_CIPHER_CTX_free(ctx);
        return "";
    }

    EVP_CIPHER_CTX_free(ctx);

    string encrypted(reinterpret_cast<char*>(ciphertext), out_len + final_len);
    delete[] ciphertext;
    return encrypted;
}

string encode_base64(const string &input){
    typedef base64_from_binary<transform_width<const char *, 6, 8>> base64_enc;
    string encoded(base64_enc(input.c_str()), base64_enc(input.c_str() + input.size()));
    size_t padding_size = (3 - input.size() % 3) % 3;
    encoded.append(padding_size, '=');
    return encoded;
}


int main(int argc, char *argv[]) {
    if (argc != 2)
    {
        printf("\nAES encryption with UTF-16LE string.\n\nUsage: AES UTF-16LE.exe \"<string>\"\n\nNOTE: \n1. the input string must be quoted with \" \"\n2. AES encryption mode is CBC.\n3. AES encryption padding is PKCS7.\n4. AES key is fixed as: be44e76d37701c5a20ee22dec95449636e208ea3d5fcceb4e454c92cdca25fba.\n5. AES iv is fixed as: dda7941619cf4be7162432c8fd15c9e9.\n\n");
        return 1;
    }    
    clock_t t = clock();
    unsigned char aes_key[32] = {0xbe, 0x44, 0xe7, 0x6d, 0x37, 0x70, 0x1c, 0x5a, 0x20, 0xee, 0x22, 0xde, 0xc9, 0x54, 0x49, 0x63, 0x6e, 0x20, 0x8e, 0xa3, 0xd5, 0xfc, 0xce, 0xb4, 0xe4, 0x54, 0xc9, 0x2c, 0xdc, 0xa2, 0x5f, 0xba};
    unsigned char aes_iv[16] = {0xdd, 0xa7, 0x94, 0x16, 0x19, 0xcf, 0x4b, 0xe7, 0x16, 0x24, 0x32, 0xc8, 0xfd, 0x15, 0xc9, 0xe9};
    string result;
    char *text = (char *)malloc(4096);
    strcpy(text, argv[1]);

    // Convert the text to UTF-16LE
    wstring_convert<codecvt_utf8_utf16<wchar_t>> converter;
    wstring wide_text = converter.from_bytes(text);

    // Encrypt the text using AES
    result = encode_base64(aes_encrypt(wide_text, aes_key, aes_iv));

    if (result.empty()) {
        printf("Error during encryption!\n");
        return 1;
    }
    printf("%s\n", result.c_str());
    return 0;
}